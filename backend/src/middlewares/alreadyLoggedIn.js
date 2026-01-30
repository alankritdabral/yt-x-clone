import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";

export const alreadyLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.refreshToken;

  // No token → user not logged in → allow login
  if (!token) {
    return next();
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    // Invalid / expired token → allow login
    return next();
  }

  const user = await User.findById(decoded._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    return next();
  }

  // User already logged in → block login
  throw new ApiError(409, "User already logged in");
});