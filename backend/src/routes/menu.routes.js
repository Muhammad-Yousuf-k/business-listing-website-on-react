import express from "express";
import {
    createMenu,
    getMenu

} from "../controllers/menu.controller.js";

import isLoggedIn from "../middlewares/isLoggedIn.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";
import isRestaurantOwner from "../middlewares/isRestaurantOwner.middleware.js";
import csrfProtection from "../middlewares/csrf.middleware.js";
import { withValidation } from "../middlewares/withValidation.js";
import { listingValidator } from "../validator/listing_form_verify.js";

const router = express.Router();

/* CREATE */
router.post("/create-menu", isLoggedIn, createMenu);
router.get("/get-menu/:_id", csrfProtection, getMenu);

export default router;