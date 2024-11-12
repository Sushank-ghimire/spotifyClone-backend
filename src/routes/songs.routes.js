import { Router } from "express";
import {
  protectedRoutes,
  requireAdmin,
} from "../middlewares/auth.middleware.js";
import { createSong, deleteSongs } from "../controllers/admin.controllers.js";

const songsRoutes = Router();

songsRoutes.post("/create", protectedRoutes, requireAdmin, createSong);
songsRoutes.delete(
  "/:songId",
  protectedRoutes,
  requireAdmin,
  deleteSongs
);

export default songsRoutes;
