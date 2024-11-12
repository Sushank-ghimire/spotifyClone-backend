import { Router } from "express";
import {
  protectedRoutes,
  requireAdmin,
} from "../middlewares/auth.middleware.js";
import { createAlbum, deleteAlbum } from "../controllers/admin.controllers.js";

const albumRoutes = Router();

albumRoutes.post("/create", protectedRoutes, requireAdmin, createAlbum);
albumRoutes.delete("/:albumId", protectedRoutes, requireAdmin, deleteAlbum);

export default albumRoutes;
