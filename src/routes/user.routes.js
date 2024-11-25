import { Router } from "express";
import {
  getAllUsers,
  getMessages,
  userRegistration,
} from "../controllers/users.controllers.js";
import { protectedRoutes } from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", userRegistration);
userRoutes.get("/getUsers", protectedRoutes, getAllUsers);
userRoutes.post("/messages/:userId", protectedRoutes, getMessages);

export default userRoutes;
