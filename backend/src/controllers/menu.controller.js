import { RestaurantModel } from "../models/restaurant.model.js";
import { MenuItemsModel } from "../models/menu_item.model.js";
import {ReviewModel} from "../models/review.model.js";

//    CREATE REVIEW
export const createMenu = async (req, res, next) => {
    try {
        const { restaurantId, name, description, price, image, foodCategory, tags } = req.body;

        console.log("it run");


        const restaurant = await RestaurantModel.findById(restaurantId)
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        const menu = await MenuItemsModel.create({
            restaurantId,
            name,
            description,
            price,
            image,
            foodCategory,
            tags,
        });

        return res.status(201).json({
            success: true,
            message: "menu created successfully",
            menu,
        });

    } catch (error) {
        next(error);
    }
};

//    GET ALL REVIEWS
export const getMenu = async (req, res, next) => {
    // try {
    //     const reviews = await ReviewModel.find()
    //         .select("author restaurantName rating text avatar")
    //         .sort({ createdAt: -1 }) // better UX than rating sort
    //         .limit(6)
    //         .lean()

    //     if (!reviews) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "reviews not found",
    //         });

    //     }

    //     return res.status(200).json({
    //         success: true,
    //         reviews,
    //         message: "reviews found",
    //     });

    // } catch (error) {
    //     next(error)
    // }
};