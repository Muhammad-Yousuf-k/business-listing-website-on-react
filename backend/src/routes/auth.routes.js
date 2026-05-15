import express from "express";
import { register, login, logout, checkUser, otpVerify, resendOTP, resetPassword } from "../controllers/auth.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import csrfProtection from "../middlewares/csrf.middleware.js";
import { withValidation } from "../middlewares/withValidation.js";
import { authValidator } from "../validator/auth_form_verify.js";
import { sendEmail } from "../utils/sendEmail.js";
const router = express.Router();

router.post("/register", csrfProtection, withValidation(authValidator.register), register);
router.post("/login", csrfProtection, withValidation(authValidator.login), login);
router.post("/logout", csrfProtection, logout);

router.post("/verify-otp", csrfProtection, withValidation(authValidator.otp), otpVerify);
router.post("/resend-otp", csrfProtection, withValidation(authValidator.otp), resendOTP);
router.post("/reset-password", csrfProtection, withValidation(authValidator.otp), resetPassword);

router.get("/checkUser", isLoggedIn, checkUser);

export default router;