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
];

export const updateAthleteValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("country").optional().notEmpty().withMessage("Country is required"),
  body("age").optional().isInt({ min: 1 }).withMessage("Age must be a number"),
  body("gender")
    .optional()
    .isIn(["M", "F", "O"])
    .withMessage("Invalid gender"),
  body("personalBest").optional().isFloat(),
  body("seasonBest").optional().isFloat(),
];

