import cloudinary from "./cloudinary.js";
import fs from "fs";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(file.tempFilePath);
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(file.tempFilePath);
    throw Error("Failed to upload to cloudinary : ", error.message);
  }
};

export { uploadToCloudinary };
