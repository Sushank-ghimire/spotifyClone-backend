// all the constants used in the projects are here
import { configDotenv } from "dotenv";
configDotenv();

const adminCredentials = {
  email: `${process.env.ADMIN_EMAIL}`,
  password: `${process.env.ADMIN_PASSWORD}`,
};

const jwtSecret = process.env.JWT_SECRET_KEY;

const cloudinaryKeys = {
  CLOUD_NAME: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  CLOUDINARY_API_KEY: `${process.env.CLOUDINARY_API_KEY}`,
  CLOUDINARY_API_SECRET: `${process.env.CLOUDINARY_API_SECRET}`,
};

export { adminCredentials, jwtSecret, cloudinaryKeys };
