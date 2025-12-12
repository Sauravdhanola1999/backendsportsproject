import { body } from "express-validator";

export const createHeatValidation = [
  body("eventId").isInt().withMessage("eventId is required"),
  body("heatNumber").isInt({ min: 1 }).withMessage("Heat number must be >= 1"),
  body("round").isIn(["HEAT", "SEMI", "FINAL"]).withMessage("Invalid round type"),
];
