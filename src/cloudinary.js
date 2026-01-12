import { v2 } from "cloudinary";
import fs from "fs";

v2.config({
  cloud_name: "process.env.CLOUDINARY_CLOUD_NAME",
  api_key: "process.env.CLOUDINARY_API_KEY",
  api_secret: "process.env.CLOUDINARY_API_SECRET",
});


const uploadOnCloudinary = async (filename) => {
  try {
    if (!filename) return null;
    const response = await cloudinary.uploader.upload(filename, {
      resource_type: auto,
    });
    console.log("video uplaod successfully");
    response.url;
    return response;
  } catch {
    fs.unlinkSync(filename);
    return null;
  }
};

export {uploadOnCloudinary}
