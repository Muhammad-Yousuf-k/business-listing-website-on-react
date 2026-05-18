import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: [true, "Author name is required"],
            trim: true,
            maxlength: 100,
        },

        restaurantName: {
            type: String,
            required: [true, "Restaurant name is required"],
            trim: true,
            maxlength: 150,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
            index: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            validate: {
                validator: Number.isFinite,
                message: "Rating must be a valid number"
            }
        },

        text: {
            type: String,
            required: [true, "Review text is required"],
            trim: true,
            maxlength: 1000,
        },

        avatar: {
            type: String,
            trim: true,
            maxlength: 5,
        },

    },
    {
        timestamps: true,
    }
);

reviewSchema.index(
    { userId: 1, restaurantId: 1 },
    { unique: true }
);

reviewSchema.pre("save", function () {
    if (!this.avatar && this.author) {
        this.avatar = this.author
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();
    }
});

const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel;