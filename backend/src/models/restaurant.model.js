import mongoose from "mongoose";
import {
    RESTAURANT_CATEGORIES,
    FOOD_CATEGORIES,
    SUBSCRIPTION,
    STATUS,
    STATE,
} from "../constant/RESTAURANT_CONSTANT.js";

const restaurantSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        main_category: {
            type: String,
            enum: RESTAURANT_CATEGORIES,
            required: true,
        },

        sub_category: {
            type: [String],
            enum: FOOD_CATEGORIES,
            default: [],
        },

        status: {
            type: String,
            enum: STATUS,
            default: "submit_pending",
        },

        contact: {
            phone: { type: String, default: "" },
            tell: { type: String, default: "" },
            whatsapp: { type: String, default: "" },
            email: { type: String, default: "" },
        },

        address: {
            country: { type: String, default: "" },
            city: { type: String, default: "" },
            street: { type: String, default: "" },
            area: { type: String, default: "" },
            state: { type: String, enum: STATE, default: "" },
            fullAddress: { type: String, default: "" },
            location: {
                lat: Number,
                lng: Number,
            }
        },

        workingHours: {
            monday: {
                open: { type: String, default: "" },
                close: { type: String, default: "" },
                closed: { type: Boolean, default: false },
            },
            tuesday: {
                open: { type: String, default: "" },
                close: { type: String, default: "" },
                closed: { type: Boolean, default: false },
            },
            wednesday: {
                open: { type: String, default: "" },
                close: { type: String, default: "" },
                closed: { type: Boolean, default: false },
            },
            thursday: {
                open: { type: String, default: "" },
                close: { type: String, default: "" },
                closed: { type: Boolean, default: false },
            },
            friday: {
                open: { type: String, default: "" },
                close: { type: String, default: "" },
                closed: { type: Boolean, default: false },
            },
            saturday: {
                open: { type: String, default: "" },
                close: { type: String, default: "" },
                closed: { type: Boolean, default: false },
            },
            sunday: {
                open: { type: String, default: "" },
                close: { type: String, default: "" },
                closed: { type: Boolean, default: false },
            },
        },

        subscriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscription",
        },

        features: {
            type: [String],
            default: [],
        },

        tags: {
            type: [String],
            default: [],
        },

        priorityScore: {
            type: Number,
            default: 0,
            min: 0
        },

        rating: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },

        images: {
            type: [String],
            default: [],
        },

        slug: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
restaurantSchema.index({ status: 1, priorityScore: -1 });
restaurantSchema.index({ main_category: 1, status: 1, priorityScore: -1 });
restaurantSchema.index({ "address.city": 1, status: 1, priorityScore: -1 });

restaurantSchema.index({ subscriptionId: 1 });
restaurantSchema.index({ ownerId: 1 });
restaurantSchema.index({ name: "text" });

// You can also add a compound index if you frequently query by both `main_category` and `status` 
// restaurantSchema.index({ main_category: 1, status: 1 });

export const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);