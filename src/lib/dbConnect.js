import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Database connected successfully."));
  } catch (error) {
    throw new Error(error.message);
  }
};

export default connectDatabase;
