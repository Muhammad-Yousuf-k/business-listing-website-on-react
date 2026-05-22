import { body } from "express-validator";
import { OTP_PURPOSE } from "../constant/AUTH_CONSTANT.js";  // Corrected import with .js extension

// Form validator (example for contact form)
export const formValidator = {


    contactForm: [
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

        body("subject")
            .notEmpty()
            .withMessage("Subject is required"),

    ],

};