import express from "express";
import athleteRoutes from "./athlete.routes.js";
import eventRoutes from "./event.routes.js";
import heatRoutes from "./heat.routes.js";
import resultRoutes from "./result.routes.js";
import authRoutes from "./auth.routes.js"

const router = express.Router(); 

router.use("/athletes", athleteRoutes);
router.use("/events", eventRoutes); 
router.use("/heats", heatRoutes);
router.use("/results", resultRoutes);
router.use("/auth", authRoutes);


export default router;
