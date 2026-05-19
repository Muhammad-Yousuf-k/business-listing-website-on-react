import { RestaurantModel } from "../models/restaurant.model.js";
import { MenuItemsModel } from "../models/menu_item.model.js";
import { ReviewModel } from "../models/review.model.js";

//    CREATE REVIEW
export const searchState = async (req, res, next) => {
    try {
        const { q, page = 1, limit = 8 } = req.query;

        console.log("search", q);
        if (!q) {
            return res.status(400).json({
                success: false,
                message: "search query required",
            });
        }


        const pageNumber = Math.max(Number(page) || 1, 1);
        const limitNumber = Math.min(Math.max(Number(limit) || 8, 1), 50);
        const skip = (pageNumber - 1) * limitNumber;

        const searchQuery = {
            status: { $in: ["active_paid", "active_free"] },
            "address.state": { $regex: q, $options: "i" },
        };

        const totalRestaurants =
            await RestaurantModel.countDocuments(searchQuery);

        const restaurants = await RestaurantModel.find(searchQuery)
            .select(
                "name main_category address.city reviewCount rating images priorityScore"
            )
            .sort({ priorityScore: -1 })
            .skip(skip)
            .limit(limitNumber)
            .lean();



        return res.status(200).json({
            success: true,
            message: "Restaurants fetched by state successfully",
            pagination: {
                totalRestaurants,
                currentPage: pageNumber,
                totalPages: Math.ceil(
                    totalRestaurants / limitNumber
                ),
                limit: limitNumber,
                hasNextPage:
                    pageNumber <
                    Math.ceil(totalRestaurants / limitNumber),
                hasPrevPage: pageNumber > 1,
            },

            result: restaurants,
        });
    } catch (error) {
        next(error);
    }
};

export const searchAllRestaurants = async (req, res, next) => {
    try {
        const { q, page = 1, limit = 8 } = req.query;

        if (q !== "all-restaurants") {
            return res.status(400).json({
                success: false,
                message: "Invalid search query",
            });
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const searchQuery = {
            status: { $in: ["active_paid", "active_free"] },
        };

        const totalRestaurants =
            await RestaurantModel.countDocuments(searchQuery);

        const restaurants = await RestaurantModel.find(searchQuery)
            .select(
                "name main_category address.city reviewCount rating images priorityScore"
            )
            .sort({ priorityScore: -1 })
            .skip(skip)
            .limit(limitNumber)
            .lean();

        return res.status(200).json({
            success: true,
            message: "Restaurants fetched successfully",

            pagination: {
                totalRestaurants,
                currentPage: pageNumber,
                totalPages: Math.ceil(
                    totalRestaurants / limitNumber
                ),
                limit: limitNumber,
                hasNextPage:
                    pageNumber <
                    Math.ceil(totalRestaurants / limitNumber),
                hasPrevPage: pageNumber > 1,
            },

            result: restaurants,
        });
    } catch (error) {
        next(error);
    }
};
export const searchAllEats = async (req, res, next) => {
    return "hello"
};
export const searchAllReviews = async (req, res, next) => {
    return "hello"
};
export const searchAllMenu = async (req, res, next) => {
    return "hello"
};

