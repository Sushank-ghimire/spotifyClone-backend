import { clerkClient } from "@clerk/express";
import { adminCredentials } from "../constants.js";

const protectedRoutes = async (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized user", success: false });
  }
  next();
};

const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);

    const isAdmin =
      adminCredentials.email === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Access denied: Admin credentials required.",
        });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { protectedRoutes, requireAdmin };
