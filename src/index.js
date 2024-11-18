import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import {
  albumRoutes,
  userRoutes,
  songsRoutes,
  adminRoutes,
  statsRoutes,
} from "./routes/Export.js";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

configDotenv();
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "*",
};

const __dirname = path.resolve();

// connectDatabase();
const app = express();
app.use(cookieParser());
app.use(clerkMiddleware());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: 8 * 1024 * 1024, // 8MB maximum file size
  })
);

app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => res.send("Hello world"));

// User Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/songs", songsRoutes);
app.use("/api/v1/album", albumRoutes);

// Stats Routes
app.use("/api/v1/stats", statsRoutes);

// Admin Routes
app.use("/api/v1/admin", adminRoutes);

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(PORT || process.env.PORT, () => {
      console.log(`Server is listning on PORT : ${PORT || process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit the process if the connection fails
  });
