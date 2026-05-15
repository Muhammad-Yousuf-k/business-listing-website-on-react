import { RestaurantModel } from "../models/restaurant.model.js";

const isRestaurantOwner = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const restaurantId = req.params.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        // check ownership
        const isOwner =
            restaurant.ownerId.toString() === userId.toString();

        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to modify this restaurant",
            });
        }

        req.restaurant = restaurant;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while checking ownership",
        });
    }
};

export default isRestaurantOwner;