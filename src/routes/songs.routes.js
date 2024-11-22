import { Router } from "express";
import {
  getFeaturedSongs,
  getMadeForYouSongs,
  getSong,
  getSongs,
  getTrendingSongs,
} from "../controllers/song.controllers.js";
import { protectedRoutes } from "../middlewares/auth.middleware.js";

const songsRoutes = Router();

songsRoutes.get("/song/:songId", protectedRoutes, getSong);
songsRoutes.get("/featured", getFeaturedSongs);
songsRoutes.get("/made-for-you", getMadeForYouSongs);
songsRoutes.get("/trending", getTrendingSongs);
songsRoutes.get("/", protectedRoutes, getSongs);

export default songsRoutes;
