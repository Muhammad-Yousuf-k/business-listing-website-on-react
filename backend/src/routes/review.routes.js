import express from "express";
import {
    createReview,
    getLatestReview

} from "../controllers/review.controller.js";

import isLoggedIn from "../middlewares/isLoggedIn.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";
import isRestaurantOwner from "../middlewares/isRestaurantOwner.middleware.js";
import csrfProtection from "../middlewares/csrf.middleware.js";
import { withValidation } from "../middlewares/withValidation.js";
import { listingValidator } from "../validator/listing_form_verify.js";

const router = express.Router();

/* CREATE */
router.post("/create-review", isLoggedIn, csrfProtection, createReview);
router.get("/get-latest-review", csrfProtection, getLatestReview);

export default router;