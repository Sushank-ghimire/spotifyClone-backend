import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import {
  albumRoutes,
  userRoutes,
  songsRoutes,
  statsRoutes,
} from "./routes/Export.js";
import connectDatabase from "./lib/dbConnect.js";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import { requireAdmin } from "./middlewares/auth.middleware.js";

configDotenv();
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "*",
};

const __dirname = path.resolve();

connectDatabase();
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

app.get("/", (req, res) => res.send("Hello world"));

// User Routes
app.use("/api/v1/users", userRoutes);

// Admin Routes
app.use("/api/v1/admin/songs", songsRoutes);
app.use("/api/v1/admin/album", albumRoutes);
app.use("/api/v1/admin/stats", statsRoutes);

app.get("/api/v1/admin/check", requireAdmin, (req, res) => {
  return res
    .status(200)
    .json({ message: "Admin authorized", admin: true, success: true });
});

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server is listning on PORT : ${PORT || process.env.PORT}`);
});
