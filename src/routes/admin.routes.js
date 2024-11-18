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
// check the user is admin or not
adminRoutes.get("/check", checkAdmin);

adminRoutes.use(protectedRoutes, adminRoutes);


// Admin Songs Routes
adminRoutes.post("/songs/create", createSong);
adminRoutes.delete("/songs/:songId", deleteSongs);

// Admin Album Routes
adminRoutes.post("/album/create", createAlbum);
adminRoutes.delete("/album/:albumId", deleteAlbum);

export default adminRoutes;
