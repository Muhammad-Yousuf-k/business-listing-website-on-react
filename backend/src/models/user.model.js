import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLE, OTP_PURPOSE } from "../constant/AUTH_CONSTANT.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is Required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is Required"],
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ROLE,
            default: "viewer",
        },

        address: {
            country: {
                type: String,
                default: "",
            },

            state: {
                type: String,
                default: "",
            },

            city: {
                type: String,
                default: "",
            },
        },

        avatar: {
            type: String,
            default: "",
        },

        otp: {
            value: {
                type: String,
                default: null,
            },

            purpose: {
                type: String,
                enum: OTP_PURPOSE,
                default: null,
            },

            expiresAt: {
                type: Date,
                default: null,
            },
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        saveListings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Restaurant",
            },
        ],
    },
    { timestamps: true, }
);

// Create an index for RestaurantsId to improve query performance

// Hash password before save
userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    if (this.isModified("otp.value") && this.otp?.value) {
        this.otp.value = await bcrypt.hash(this.otp.value, 10);
    }
});

// Compare password
userSchema.methods.comparePassword = function (password) {
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);
};

// Compare OTP
userSchema.methods.compareOtp = function (otp) {
    if (!this.otp?.value) return false;
    return bcrypt.compare(otp, this.otp.value);
};

export const userModel = mongoose.model("User", userSchema);