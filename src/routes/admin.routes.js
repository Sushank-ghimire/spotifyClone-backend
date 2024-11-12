import { Router } from "express";
import { adminLoginMiddleware } from "../middlewares/adminAuth.middleware.js";
import {
  accessToken,
  loginAdmin,
  logoutAdmin,
} from "../controllers/admin.controllers.js";

const adminRoutes = Router();

adminRoutes
  .post("/login", adminLoginMiddleware, loginAdmin)
  .get("/logout", logoutAdmin)
  .get("/refresh-token", accessToken);

export default adminRoutes;
