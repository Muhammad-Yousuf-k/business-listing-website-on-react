import express from "express";
import {
    register,
    login,
    logout,
    checkUser,
    OtpVerify,
    sendOtp,
    updateRole,
    updateAvatar,
} from "../controllers/auth.controller.js";

import isLoggedIn from "../middlewares/isLoggedIn.js";
import csrfProtection from "../middlewares/csrf.middleware.js";
import { withValidation } from "../middlewares/withValidation.js";
import { authValidator } from "../validator/auth_form_verify.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
    "/register",
    csrfProtection,
    withValidation(authValidator.register),
    register
);

router.post(
    "/login",
    csrfProtection,
    withValidation(authValidator.login),
    login
);

router.post(
    "/otp-verify",
    csrfProtection,
    withValidation(authValidator.otp),
    OtpVerify
);

router.post(
    "/send-otp",
    csrfProtection,
    withValidation(authValidator.sendOtp),
    sendOtp
);

router.put(
    "/update-role",
    csrfProtection,
    isLoggedIn,
    withValidation(authValidator.updateRole),
    updateRole
);

router.put(
    "/update-avatar",
    csrfProtection,
    isLoggedIn,
    upload.single("image"),
    updateAvatar
);



router.get("/checkUser", csrfProtection, isLoggedIn, checkUser);

router.post("/logout", csrfProtection, isLoggedIn, logout);

export default router;