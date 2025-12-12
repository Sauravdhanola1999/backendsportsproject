import express from "express";
import athleteController from "../controllers/athlete.controller.js";
import { createAthleteValidation, updateAthleteValidation } from "../validations/athlete.validation.js";
import { validate } from "../middleware/validate.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", athleteController.getAll);
router.get("/:id", athleteController.getById);
router.post("/create", adminOnly, createAthleteValidation, validate, athleteController.create);
router.put("/edit/:id", adminOnly, updateAthleteValidation, validate, athleteController.update);
router.delete("/soft-delete/:id", adminOnly, athleteController.delete);

export default router;
