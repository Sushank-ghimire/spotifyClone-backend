import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import songsRoutes from "./routes/songs.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import connectDatabase from "./lib/dbConnect.js";

configDotenv();
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "*",
};

connectDatabase();
const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello world"));

// User Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/songs", songsRoutes);
app.use("/api/v1/album", albumRoutes);
app.use("/api/v1/stats", statsRoutes);

// Admin auth protected routes
app.use("/api/v1/admin", adminRoutes);

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server is listning on PORT : ${PORT || process.env.PORT}`);
});
