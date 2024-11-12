// all the constants used in the projects are here
import { configDotenv } from "dotenv";
configDotenv();

const adminCredentials = {
  email: `${process.env.ADMIN_EMAIL}`,
  password: `${process.env.ADMIN_PASSWORD}`,
};

const jwtSecret = process.env.JWT_SECRET_KEY;

export { adminCredentials, jwtSecret };
