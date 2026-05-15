import { body } from "express-validator";
import { ROLE } from "../constant/AUTH_CONSTANT.js";  // Corrected import with .js extension
import { userModel } from "../models/user.model.js";  // Corrected import with .js extension

// Auth validator (example for login/register)
export const authValidator = {

    listing: [
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

    menuItems: [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required"),


        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email")
            .custom(async (value) => {
                const existingEmail = await userModel.findOne({ email: value });
                if (existingEmail) {
                    throw new Error("User exist already")
                }
            }),

        body("password")
            .notEmpty()
            .withMessage("Password is required"),

        body("role")
            .notEmpty()
            .withMessage("role is required")
            .isIn(["viewer", "owner"]),

        body("phone_number")
            .optional()

    ]
};