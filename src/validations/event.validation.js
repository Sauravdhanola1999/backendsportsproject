import { body } from "express-validator";

export const createEventValidation = [
  body("eventName").notEmpty().withMessage("Event name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("distance").isInt({ min: 50 }).withMessage("Distance must be >= 50m"),
];

export const updateEventValidation = [
  body("eventName")
    .optional()
    .notEmpty()
    .withMessage("Event name cannot be empty"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("distance")
    .optional()
    .isInt({ min: 50 })
    .withMessage("Distance must be >= 50m"),
];
