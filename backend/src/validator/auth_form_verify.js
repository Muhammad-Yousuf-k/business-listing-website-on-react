import { body } from "express-validator";
import { OTP_PURPOSE } from "../constant/AUTH_CONSTANT.js";  // Corrected import with .js extension

// Auth validator (example for login/register)
export const authValidator = {

    login: [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email"),


        body("password")
            .notEmpty()
            .withMessage("Password is required"),
    ],

    register: [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required"),


        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email"),

        body("password")
            .notEmpty()
            .withMessage("Password is required"),

        body("role")
            .notEmpty()
            .withMessage("Role is required")
            .isIn(["viewer", "owner"])
            .withMessage("Invalid role"),


        body("address.country")
            .notEmpty()
            .withMessage("Country is required"),

        body("address.state")
            .notEmpty()
            .withMessage("State is required"),

        body("address.city")
            .notEmpty()
            .withMessage("City is required"),



    ],

    updateAvatar: [

        body("avatar")
            .notEmpty()
            .withMessage("Avatar is required"),

    ],

    updateRole: [

        body("role")
            .notEmpty()
            .withMessage("Role is required")
            .isIn(["viewer", "owner"])
            .withMessage("Invalid role"),

    ],

    otp: [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email"),


        body("otp")
            .notEmpty()
            .withMessage("otp is required"),

        body("purpose")
            .notEmpty()
            .withMessage("purpose is required")
            .isIn(OTP_PURPOSE),

    ],

    sendOtp: [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email"),



        body("purpose")
            .notEmpty()
            .withMessage("purpose is required")
            .isIn(OTP_PURPOSE),

    ],
};