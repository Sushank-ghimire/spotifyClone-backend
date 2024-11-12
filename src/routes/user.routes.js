import { Router } from "express";
import { userRegistration } from "../controllers/users.controllers.js";

const userRoutes = Router();

userRoutes.post("/register", userRegistration);

export default userRoutes;