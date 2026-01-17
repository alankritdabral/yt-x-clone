import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { z } from "zod";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-]).+$/,
      "Password must contain uppercase, lowercase, number & special character"
    ),
  fullname: z
    .string()
    .trim()
    .min(3, "Fullname must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Fullname can contain only letters & spaces"),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-z0-9._]+$/, "Username can contain only a-z, 0-9, . and _"),
});

const registerUser = asyncHandler(async (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues[0].message; // first error only
    throw new ApiError(400, message);
  }

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "user already existed");
  }

  const avatarlocalPath = req.files?.avatar[0]?.path;
  const coverImagelocalPath = req.files?.coverImage[0]?.path;

  if (!avatarlocalPath) {
    throw new ApiError(400, "upload new image");
  }
  if (!coverImagelocalPath) {
    throw new ApiError(400, "upload new image");
  }

  const avatar = await uploadOnCloudinary(avatarlocalPath);
  const coverImage = await uploadOnCloudinary(coverImagelocalPath);

  if (!avatar) {
    throw new ApiError(400, "upload failed image");
  }

  if (!coverImage) {
    throw new ApiError(400, "upload failed image");
  }

  const user = User.create({
    fullname,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if(!createdUser){
    throw new ApiError(400,"something went wrong")
  }

  const { email, password, fullname, username } = result.data;

  return res.status(200).json(
    ApiResponse(201), createdUser, "User registed succesfully"
 );
});

export { registerUser };
