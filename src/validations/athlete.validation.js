import { body } from "express-validator";

export const createAthleteValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("age").isInt({ min: 10, max: 60 }).withMessage("Age must be between 10 and 60"),
  body("gender").isIn(["M", "F", "O"]).withMessage("Invalid gender"),
  body("personalBest")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Personal best must be a positive number"),
  body("seasonBest")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Season best must be a positive number"),
  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required")
    .isInt({ min: 1 })
    .withMessage("Event ID must be a positive integer"),
  body("heatId")
    .notEmpty()
    .withMessage("Heat ID is required")
    .isInt({ min: 1 })
    .withMessage("Heat ID must be a positive integer"),
  body("lane")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Lane must be between 1 and 10"),
];

export const updateAthleteValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("country").optional().notEmpty().withMessage("Country cannot be empty"),
  body("age").optional().isInt({ min: 10, max: 60 }).withMessage("Age must be between 10 and 60"),
  body("gender")
    .optional()
    .isIn(["M", "F", "O"])
    .withMessage("Invalid gender"),
  body("personalBest")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Personal best must be a positive number"),
  body("seasonBest")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Season best must be a positive number"),
  // Note: eventId, heatId, and lane should not be updated via athlete update endpoint
  // Use result endpoints to manage athlete-event-heat assignments
];

