import express from "express";
import authController from "../controllers/auth.controller.js";
import { signInValidation } from "../validations/auth.validation.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/signup-admin", authController.signupAdmin);
router.post("/signin-admin", signInValidation, validate, authController.login);

export default router;
