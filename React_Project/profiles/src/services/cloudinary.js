import axios from "axios";

const CLOUD_NAME = "dan24q0ck";
const UPLOAD_PRESET = "Images";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );

  return response.data.secure_url;
};
