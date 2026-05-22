import { RestaurantModel } from "../models/restaurant.model.js";
import { ReviewModel } from "../models/review.model.js";
import { MenuItemsModel } from "../models/menu_item.model.js";
import slugify from "slugify";

/* CREATE RESTAURANT */
export const createRestaurant = async (req, res, next) => {
    try {
        const payload = req.body;

        // Owner ID from the authenticated user
        const ownerId = req.user._id;

        // Generating slug from the restaurant name
        const slug = slugify(payload.name, { lower: true, strict: true });

        // Create a new restaurant entry in the database
        const restaurant = await RestaurantModel.create({
            ...payload,
            ownerId,
            slug, // Adding the slug generated from the restaurant name
        });

        res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
        });
    } catch (error) {
        next(error);
    }
};
// Create Route for Menu Items
export const createMenuItems = async (req, res) => {
    try {
        const { restaurantId, menu } = req.body; // Getting restaurantId and menu items from request body

        // Validate the input
        if (!restaurantId || !menu || !Array.isArray(menu) || menu.length === 0) {
            return res.status(400).json({ success: false, message: "Restaurant ID and menu items are required." });
        }

        const MenuItems = await MenuItemsModel.create({
            restaurantId,
            menu,
        });

        return res.status(201).json({
            success: true,
            message: 'Menu items created successfully.',
            data: MenuItems,
        });
    } catch (error) {
        next(error);
    }
};

export const getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await RestaurantModel.find({
            status: { $in: ["active_paid", "active_free"] }
        })
            .select("name main_category address.city reviewCount rating images priorityScore")
            .sort({ priorityScore: -1 })
            .limit(8)
            .lean();

            console.log("restaurants", restaurants);

        res.json({
            success: true,
            count: restaurants.length,
            restaurants
        });

    } catch (error) {
        next(error);
    }
};

export const getRestaurantById = async (req, res, next) => {
    try {
        const restaurantId = req.params._id;

        const [restaurant, reviews, menuItems] = await Promise.all([
            RestaurantModel.findById(restaurantId)
                .select("name rating reviewCount main_category address description images features contact workingHours")
                .lean(),

            ReviewModel.find({ restaurantId })
                .select("author restaurantName rating text avatar")
                .sort({ createdAt: -1 }) // better UX than rating sort
                .limit(3)
                .lean(),

            MenuItemsModel.find({ restaurantId })
                .select("name description price image foodCategory tags")
                .limit(5)
                .lean()
        ]);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        res.status(200).json({
            success: true,
            restaurant,
            reviews,
            menuItems
        });

    } catch (error) {
        next(error);
    }
};

export const updateRestaurant = async (req, res, next) => {
    try {
        const updates = req.body;

        if (updates.name) {
            updates.slug = slugify(updates.name, { lower: true, strict: true });
        }

        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Restaurant updated successfully",
            restaurant,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Restaurant deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const search = async (req, res, next) => {
    try {
        const { q, q1 } = req.query;

        if (!q && !q1) {
            return res.status(400).json({
                success: false,
                message: "All search parameters are required",
            });
        }

        console.log("search", q, q1);




        res.status(200).json({
            success: true,
            message: "search successfully",
            result: null,
        });
    } catch (error) {
        next(error);
    }
};