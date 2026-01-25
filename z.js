import dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import crypto from "crypto";

dotenv.config();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const FILE_PATH = "/home/aloo/Desktop/yt-x-clone/cld-sample-5.jpg";

function signParams(params, apiSecret) {
  // Cloudinary signature = sha1 of sorted params joined with & + api_secret
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");

  return crypto.createHash("sha1").update(sorted + apiSecret).digest("hex");
}

async function uploadToCloudinary() {
  if (!fs.existsSync(FILE_PATH)) {
    console.log("❌ File not found:", FILE_PATH);
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);

  // ✅ params that will be signed
  const paramsToSign = {
    timestamp,
    folder: "test_uploads",
  };

  const signature = signParams(paramsToSign, API_SECRET);

  const form = new FormData();
  form.append("file", fs.createReadStream(FILE_PATH));
  form.append("api_key", API_KEY);
  form.append("timestamp", timestamp);
  form.append("folder", "test_uploads");
  form.append("signature", signature);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  console.log("📌 Upload endpoint:", url);

  try {
    const res = await axios.post(url, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 300000, // 5 minutes in ms
    });

    console.log("✅ Uploaded successfully!");
    console.log("secure_url:", res.data.secure_url);
  } catch (err) {
    console.log("❌ Upload failed");

    // Better error output
    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Data:", err.response.data);
      console.log("Headers:", err.response.headers);
    } else {
      console.log("Error:", err.message);
    }
  }
}

uploadToCloudinary();
