import { User } from "../models/Users.models.js";

const userRegistration = async (req, res, next) => {
  try {
    const { clerkId, userFullName, email, profileUrl } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const userDetails = [clerkId, email, userFullName, profileUrl];

    if (userDetails.some((field) => !field || field === "")) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const userAccount = await User.create({
      clerkId,
      email,
      userFullName,
      profileUrl,
    });
    if (!userAccount) {
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
    return res
      .status(201)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = await req.auth.currentUserId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });

    return res.status(200).json({ users });
    
  } catch (error) {
    next(error);
  }
};

export { userRegistration, getAllUsers };
