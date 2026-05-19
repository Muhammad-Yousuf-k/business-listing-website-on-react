import express from "express";
import {
    searchState,
    searchAllRestaurants,
    searchAllEats,
    searchAllReviews,
    searchAllMenu,
} from "../controllers/search.controller.js";

import isLoggedIn from "../middlewares/isLoggedIn.js";
import authorizeRole from "../middlewares/authorizeRole.middleware.js";
import isRestaurantOwner from "../middlewares/isRestaurantOwner.middleware.js";
import csrfProtection from "../middlewares/csrf.middleware.js";

const router = express.Router();

/* CREATE */
router.get("/state", csrfProtection, searchState);
router.get("/all-restaurants", csrfProtection, searchAllRestaurants);
router.get("/all-eats", csrfProtection, searchAllEats);
router.get("/all-reviews", csrfProtection, searchAllReviews);
router.get("/all-menu", csrfProtection, searchAllMenu);

export default router;