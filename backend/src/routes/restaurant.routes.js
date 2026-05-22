import express from "express";
import {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createMenuItems,
    search
} from "../controllers/restaurant.controller.js";

import isLoggedIn from "../middlewares/isLoggedIn.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";
import isRestaurantOwner from "../middlewares/isRestaurantOwner.middleware.js";
import csrfProtection from "../middlewares/csrf.middleware.js";
import { withValidation } from "../middlewares/withValidation.js";
import { listingValidator } from "../validator/listing_form_verify.js";

const router = express.Router();

/* CREATE */
router.post("/create-restaurant-listing", isLoggedIn, csrfProtection, authorizeRole("owner"), withValidation(listingValidator.listing), createRestaurant);
/* READ ALL */
router.get("/get-best-restaurant-listing", csrfProtection, getRestaurants);
/* READ ONE */
router.get("/get-restaurant-listing/:_id", csrfProtection, getRestaurantById);



/* Search */
router.get("/search/", search);
/* UPDATE */
router.put("/update-restaurant-listing/:_id", isLoggedIn, csrfProtection, authorizeRole("owner"), isRestaurantOwner, updateRestaurant);
/* DELETE */
router.delete("/delete-restaurant-listing/:_id", isLoggedIn, csrfProtection, authorizeRole("owner", "admin"), isRestaurantOwner, deleteRestaurant);

export default router;