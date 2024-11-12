import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userFullName: {
      type: String,
      required: [true, "Users name must be required"],
    },
    email: {
      type: String,
      required: [true, "Users email must be required"],
    },
    profileUrl: {
      type: String,
    },
    clerkId: {
      unique: true,
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const User = models("User") || model("User", userSchema);
