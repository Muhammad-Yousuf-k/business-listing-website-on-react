import { body } from "express-validator";
import {
    RESTAURANT_CATEGORIES,
    FOOD_CATEGORIES,
} from "../constant/RESTAURANT_CONSTANT.js";

export const listingValidator = {

    listing: [
        // Name
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required")
            .isLength({ min: 2, max: 120 })
            .withMessage("Name must be between 2 and 120 characters"),

        // Description
        body("description")
            .trim()
            .notEmpty()
            .withMessage("Description is required")
            .isLength({ min: 10, max: 2000 })
            .withMessage("Description must be between 10 and 2000 characters"),

        // Main Category
        body("main_category")
            .notEmpty()
            .withMessage("Main category is required")
            .isIn(RESTAURANT_CATEGORIES)
            .withMessage("Invalid main category"),

        // Sub Categories
        body("sub_category")
            .optional()
            .isArray()
            .withMessage("Sub category must be an array"),

        body("sub_category.*")
            .optional()
            .isIn(FOOD_CATEGORIES)
            .withMessage("Invalid sub category"),

        // Contact
        body("contact")
            .optional()
            .isObject()
            .withMessage("Contact must be an object"),

        body("contact.phone")
            .optional()
            .trim()
            .isLength({ min: 6, max: 20 })
            .withMessage("Phone number is invalid"),

        body("contact.tell")
            .optional()
            .trim()
            .isLength({ min: 6, max: 20 })
            .withMessage("Tell number is invalid"),

        body("contact.whatsapp")
            .optional()
            .trim()
            .isLength({ min: 6, max: 20 })
            .withMessage("Whatsapp number is invalid"),

        body("contact.email")
            .optional()
            .trim()
            .isEmail()
            .withMessage("Invalid email address"),

        // Address
        body("address")
            .optional()
            .isObject()
            .withMessage("Address must be an object"),

        body("address.country")
            .trim()
            .notEmpty()
            .withMessage("country is required")
            .isLength({ min: 2, max: 100 })
            .withMessage("Invalid country"),

        body("address.city")
            .trim()
            .notEmpty()
            .withMessage("city is required")
            .isLength({ min: 2, max: 100 })
            .withMessage("Invalid city"),

        body("address.street")
            .trim()
            .notEmpty()
            .withMessage("Street is required")
            .isLength({ min: 2, max: 200 })
            .withMessage("Invalid street"),

        body("address.area")
            .trim()
            .notEmpty()
            .withMessage("area is required")
            .isLength({ min: 2, max: 100 })
            .withMessage("Invalid area"),

        body("address.state")
            .trim()
            .notEmpty()
            .withMessage("state is required")
            .isLength({ min: 2, max: 100 })
            .withMessage("Invalid state"),

        body("address.fullAddress")
            .optional()
            .trim()
            .isLength({ min: 5, max: 500 })
            .withMessage("Invalid full address"),

        // Location
        body("address.location")
            .optional()
            .isObject()
            .withMessage("Location must be an object"),

        // Working Hours
        body("workingHours")
            .optional()
            .isObject()
            .withMessage("Working hours must be an object"),

        // Features
        body("features")
            .optional()
            .isArray()
            .withMessage("Features must be an array"),

        body("features.*")
            .optional()
            .trim()
            .isString()
            .withMessage("Feature must be a string"),

        // Tags
        body("tags")
            .optional()
            .isArray()
            .withMessage("Tags must be an array"),

        body("tags.*")
            .optional()
            .trim()
            .isString()
            .withMessage("Tag must be a string"),

        // Images
        body("images")
            .optional()
            .isArray()
            .withMessage("Images must be an array"),
    ],
};