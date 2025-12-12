import express from "express";
import heatController from "../controllers/heat.controller.js";
import { validate } from "../middleware/validate.js";
import { createHeatValidation } from "../validations/heat.validation.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", adminOnly, createHeatValidation, validate, heatController.create);
router.get("/", heatController.getAll);
router.get("/:id", heatController.getById);
router.get("/event/:eventId", heatController.getByEvent);
router.delete("/:id", adminOnly, heatController.delete);

export default router;
