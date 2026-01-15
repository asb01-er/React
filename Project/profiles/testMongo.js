import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const CLOUD_NAME = process.env.CLOUD_NAME;
const UPLOAD_PRESET = process.env.UPLOAD_PRESET;

// Pick a small image file in your project folder
const filePath = "./test-image.jpg";

const testUpload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      { headers: formData.getHeaders() }
    );

    console.log("✅ Cloudinary Upload Success:", res.data.secure_url);
  } catch (err) {
    console.error("❌ Cloudinary Upload Failed:", err.response?.data || err.message);
  }
};

testUpload();
