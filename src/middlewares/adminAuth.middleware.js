import { adminCredentials } from "../constants.js";

const adminLoginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      req.user = email;
      return next();
    }
    return res
      .status(401)
      .json({ success: false, message: "Invalid admin credentials" });
  } catch (error) {
    throw Error(error.message);
  }
};

export { adminLoginMiddleware };
