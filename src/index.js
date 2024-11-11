import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

const corsOptions = {
  origin: "http://localhost:5173",
};

configDotenv();
const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello world"));

// User Routes
app.use("/api/v1/users", userRoutes);

// Admin auth protected routes
app.use("/api/v1/admin", adminRoutes);

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server is listning on PORT : ${PORT || process.env.PORT}`);
});
