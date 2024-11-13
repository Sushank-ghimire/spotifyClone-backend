import { Router } from "express";
import { protectedRoutes, requireAdmin } from "../middlewares/auth.middleware.js";
import { getTotalStats } from "../controllers/stats.controllers.js";

const statsRoutes = Router();

statsRoutes.use(protectedRoutes, requireAdmin);
statsRoutes.get("/totalStats", getTotalStats);

export default statsRoutes;
