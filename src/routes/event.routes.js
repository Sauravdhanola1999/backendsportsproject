import express from "express";
import eventController from "../controllers/event.controller.js";
import { createEventValidation, updateEventValidation } from "../validations/event.validation.js";
import { validate } from "../middleware/validate.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", adminOnly, createEventValidation, validate, eventController.create);
router.get("/", eventController.getAll);
router.get("/:id", eventController.getById);
router.put("/:id", adminOnly, updateEventValidation, valvalidateidator, eventController.update);
router.delete("/soft-delete/:id", adminOnly, eventController.delete);

router.get("/:id/details", eventController.getDetails);

export default router;
