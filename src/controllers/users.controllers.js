import { User } from "../models/Users.models.js";
import { Message } from "../models/Message.models.js";

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
    const currentUserId = await req.auth?.userId;
    if (!currentUserId) {
      return res
        .status(400)
        .json({ error: "Current user ID is not available" });
    }
    // const users = await User.find({ clerkId: { $ne: currentUserId } });
    const users = await User.find({});

    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const myId = req.auth.userId;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export { userRegistration, getAllUsers, getMessages };
