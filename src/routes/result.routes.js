import express from "express";
import resultController from "../controllers/result.controller.js";
import {
  createResultValidation,
  updateResultValidation,
} from "../validations/result.validation.js";
import { validate } from "../middleware/validate.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", adminOnly, createResultValidation, validate, resultController.create);
router.get("/heat/:heatId", resultController.getHeatResults);
router.put("/:id", adminOnly, updateResultValidation, validate, resultController.update);
router.put("/event/:eventId/heat/:heatId/athlete/:athleteId", adminOnly, updateResultValidation, validate, resultController.updateByEventHeatAndAthlete);
router.get("/leaderboard/:eventId", resultController.leaderboard);

export default router;
