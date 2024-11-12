import cloudinary from "./cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    throw Error("Failed to upload to cloudinary : ", error.message);
  }
};

export { uploadToCloudinary };
