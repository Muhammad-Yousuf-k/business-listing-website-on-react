import mongoose from "mongoose";
import {
    SUBSCRIPTION,
} from "../constant/RESTAURANT_CONSTANT.js";

const subscriptionSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },

        plan: {
            type: String,
            enum: SUBSCRIPTION,
            default: "free",
        },

        startAt: Date,

        endAt: Date,

        isActive: {
            type: Boolean,
            default: false,
        },
        autoRenew: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes


// You can also add a compound index if you frequently query by both `main_category` and `status` 

export const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);