import { Router } from "express";
import {
  getAllUsers,
  userRegistration,
} from "../controllers/users.controllers.js";
import { protectedRoutes } from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", userRegistration);
userRoutes.get("/getUsers", protectedRoutes, getAllUsers);

export default userRoutes;
