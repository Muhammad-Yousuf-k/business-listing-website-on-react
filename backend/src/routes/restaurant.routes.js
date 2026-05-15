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


const router = express.Router();

/* CREATE */
router.post("/create-restaurant-listing", isLoggedIn, csrfProtection, authorizeRole("owner"), createRestaurant);
/* CREATE */
router.post("/create-restaurant-menu", isLoggedIn, csrfProtection, authorizeRole("owner"), createMenuItems);
/* READ ALL */
router.get("/get-all-restaurant-listing", getRestaurants);
/* READ ONE */
router.get("/get-restaurant-listing/:id", getRestaurantById);
/* Search */
router.get("/search/", search);
/* UPDATE */
router.put("/update-restaurant-listing/:id", isLoggedIn, csrfProtection, authorizeRole("owner"), isRestaurantOwner, updateRestaurant);
/* DELETE */
router.delete("/delete-restaurant-listing/:id", isLoggedIn, csrfProtection, authorizeRole("owner", "admin"), isRestaurantOwner, deleteRestaurant);

export default router;