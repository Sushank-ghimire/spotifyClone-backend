import jwt from "jsonwebtoken";
import { jwtSecret } from "../constants.js";

const loginAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    // Generate a JWT token
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });

    // Set the token as a cookie
    res.cookie("adminAuth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Admin login successful", token: token });
  } catch (error) {
    throw new Error(error.message);
  }
};

const accessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["adminAuth-token"];
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Sign in again required" });
    }

    const admin = await jwt.verify(refreshToken, jwtSecret);

    const { email } = admin;

    const newAccessToken = jwt.sign({ email: email }, jwtSecret, {
      expiresIn: "1d",
    });
    res.cookie("adminAuth-token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    throw Error(error.message);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    // Clear the 'adminAuth-token' cookie
    res.clearCookie("adminAuth-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successfull" });
  } catch (error) {
    throw Error(error.message);
  }
};

export { loginAdmin, logoutAdmin, accessToken };
