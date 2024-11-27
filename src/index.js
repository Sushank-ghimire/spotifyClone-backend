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
import { createServer } from "http";
import { initializeSocket } from "./lib/Socket.js";

configDotenv();
const corsOptions = {
  origin: "http://localhost:5173",
};

const __dirname = path.resolve();

// connectDatabase();
const app = express();

const httpServer = createServer(app);
initializeSocket(httpServer);

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
  if (res.headersSent) {
    console.error("Headers already sent:", err.message);
    return next(err); // Pass to default Express error handler.
  }
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

// User Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/songs", songsRoutes);
app.use("/api/v1/album", albumRoutes);

// Stats Routes
app.use("/api/v1/stats", statsRoutes);

// Admin Routes
app.use("/api/v1/admin", adminRoutes);

// Making static dist folder and upload the production ready app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/dist/index.html"));
  });
}

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    httpServer.listen(PORT || process.env.PORT, () => {
      console.log(`Server is listning on PORT : ${PORT || process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit the process if the connection fails
  });
