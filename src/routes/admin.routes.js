import { Router } from "express";
import { protectedRoutes } from "../middlewares/auth.middleware.js";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSongs,
} from "../controllers/admin.controllers.js";
import { getSongs } from "../controllers/song.controllers.js";

const adminRoutes = Router();

adminRoutes.use(protectedRoutes, adminRoutes);

// check the user is admin or not
adminRoutes.get("/check", checkAdmin);

// Admin Songs Routes
adminRoutes.post("/songs/create", createSong);
adminRoutes.delete("/songs/:songId", deleteSongs);
adminRoutes.get("/allsongs", getSongs);

// Admin Album Routes
adminRoutes.post("/album/create", createAlbum);
adminRoutes.delete("/album/:albumId", deleteAlbum);

export default adminRoutes;
