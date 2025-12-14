import { body } from "express-validator";

export const createResultValidation = [
  body("heatId").isInt().withMessage("Heat ID is required"),
  body("athleteId").isInt().withMessage("Athlete ID is required"),
  
  body("lane")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Lane must be between 1 and 10"),

  body("reactionTime")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Reaction time must be >= 0"),

  body("status")
    .optional()
    .isIn(["OK", "DNS", "DNF", "DSQ"])
    .withMessage("Invalid status")
    .default("OK"),

  body("finishTime")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Finish time must be >= 0")
    .custom((value, { req }) => {
      // If status is OK (or not provided, defaults to OK), finishTime should be provided
      const status = req.body.status || "OK";
      if (status === "OK" && (value === undefined || value === null)) {
        throw new Error("Finish time is required when status is OK");
      }
      return true;
    }),

  body("position")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Position must be a positive integer"),
];

export const updateResultValidation = [
  body("lane")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Lane must be between 1 and 10"),

  body("reactionTime")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Reaction time must be >= 0"),

  body("status")
    .optional()
    .isIn(["OK", "DNS", "DNF", "DSQ"])
    .withMessage("Invalid status"),

  body("finishTime")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Finish time must be >= 0")
    .custom(async (value, { req }) => {
      // If status is being updated to OK, finishTime must be provided
      if (req.body.status === "OK") {
        if (value === undefined || value === null) {
          throw new Error("Finish time is required when status is OK");
        }
      }
      return true;
    }),
  
  body("position")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Position must be a positive integer"),
];

