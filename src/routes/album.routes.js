import { Router } from "express";
import {
  getAlbumById,
  getAllAlbums,
} from "../controllers/album.controllers.js";
import { protectedRoutes } from "../middlewares/auth.middleware.js";

const albumRoutes = Router();

albumRoutes.use(protectedRoutes);

albumRoutes.get("/getAlbums", getAllAlbums);
albumRoutes.get("/:albumId", getAlbumById);

export default albumRoutes;
