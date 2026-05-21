import express from "express";
import {
    register, login, logout, checkUser, OtpVerify, sendOtp,
} from "../controllers/auth.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import csrfProtection from "../middlewares/csrf.middleware.js";
import { withValidation } from "../middlewares/withValidation.js";
import { authValidator } from "../validator/auth_form_verify.js";
import { sendEmail } from "../utils/sendEmail.js";
const router = express.Router();

router.post("/register", csrfProtection, withValidation(authValidator.register), register);
router.post("/login", csrfProtection, withValidation(authValidator.login), login);

router.post("/otp-verify", csrfProtection, withValidation(authValidator.otp), OtpVerify);
router.post("/send-otp", csrfProtection, withValidation(authValidator.sendOtp), sendOtp);

router.get("/checkUser", csrfProtection, isLoggedIn, checkUser);
router.post("/logout", csrfProtection, isLoggedIn, logout);

export default router;