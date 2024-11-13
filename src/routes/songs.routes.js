import { Router } from "express";
import {
  getFeaturedSongs,
  getMadeForYouSongs,
  getSong,
  getTrendingSongs,
} from "../controllers/song.controllers.js";
import { protectedRoutes } from "../middlewares/auth.middleware.js";

const songsRoutes = Router();

songsRoutes.use(protectedRoutes);

songsRoutes.get("/:songId", getSong);
songsRoutes.get("/featured", getFeaturedSongs);
songsRoutes.get("/made-for-you", getMadeForYouSongs);
songsRoutes.get("/trending", getTrendingSongs);

export default songsRoutes;
