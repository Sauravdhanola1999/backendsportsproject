import { body } from "express-validator";

export const createEventValidation = [
  body("eventName").notEmpty().withMessage("Event name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("distance").isInt({ min: 50 }).withMessage("Distance must be >= 50m"),
];
 