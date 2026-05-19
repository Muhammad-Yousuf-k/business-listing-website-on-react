import { RestaurantModel } from "../models/restaurant.model.js";
import {ReviewModel} from "../models/review.model.js";

//    CREATE REVIEW
export const createReview = async (req, res, next) => {
    try {
        const { restaurantId, rating, text } = req.body;


        const restaurant = await RestaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        const existingReview = await ReviewModel.findOne({ userId: req.user._id, restaurantId, });
        if (existingReview) {
            return res.status(409).json({
                success: false,
                message: "You already reviewed this restaurant",
            });
        }

        const review = await ReviewModel.create({
            author: req?.user?.name,
            restaurantName: restaurant.name,
            userId: req.user._id,
            restaurantId,
            rating,
            text,
        });
        console.log("review", restaurantId, rating, text);

        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            review,
        });

    } catch (error) {
        next(error);
    }
};

//    GET ALL REVIEWS
export const getLatestReview = async (req, res, next) => {
    try {
        const reviews = await ReviewModel.find()
            .select("author restaurantName rating text avatar")
            .sort({ createdAt: -1 }) // better UX than rating sort
            .limit(6)
            .lean()

        if (!reviews) {
            return res.status(400).json({
                success: false,
                message: "reviews not found",
            });

        }

        return res.status(200).json({
            success: true,
            reviews,
            message: "reviews found",
        });

    } catch (error) {
        next(error)
    }
};


// /* ─────────────────────────────────────────────
//    GET SINGLE REVIEW
// ───────────────────────────────────────────── */
// export const getSingleReview = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const review = await Review.findById(id)
//             .populate("userId", "name email")
//             .populate("restaurantId", "name");

//         if (!review) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Review not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             review,
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };


// /* ─────────────────────────────────────────────
//    GET RESTAURANT REVIEWS
// ───────────────────────────────────────────── */
// export const getRestaurantReviews = async (req, res) => {
//     try {
//         const { restaurantId } = req.params;

//         const reviews = await Review.find({
//             restaurantId,
//             isApproved: true,
//         })
//             .populate("userId", "name")
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             success: true,
//             total: reviews.length,
//             reviews,
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };


// /* ─────────────────────────────────────────────
//    UPDATE REVIEW
// ───────────────────────────────────────────── */
// export const updateReview = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { rating, text } = req.body;

//         const review = await Review.findById(id);

//         if (!review) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Review not found",
//             });
//         }

//         if (review.userId.toString() !== req.user._id.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Unauthorized",
//             });
//         }

//         if (rating) {
//             review.rating = rating;
//         }

//         if (text) {
//             review.text = text;
//         }

//         await review.save();

//         return res.status(200).json({
//             success: true,
//             message: "Review updated successfully",
//             review,
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };


// /* ─────────────────────────────────────────────
//    DELETE REVIEW
// ───────────────────────────────────────────── */
// export const deleteReview = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const review = await Review.findById(id);

//         if (!review) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Review not found",
//             });
//         }

//         if (review.userId.toString() !== req.user._id.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Unauthorized",
//             });
//         }

//         await review.deleteOne();

//         return res.status(200).json({
//             success: true,
//             message: "Review deleted successfully",
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };