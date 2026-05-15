import mongoose from "mongoose";
import { FOOD_CATEGORIES } from "../constant/RESTAURANT_CONSTANT.js";

const MenuItemsSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    menu: [
      {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        price: { type: Number, required: true },
        image: { type: String, default: "" },
        food_category: {
          type: String,
          enum: FOOD_CATEGORIES, // Restrict food category to these options
        },
        tags: { type: [String], default: [] }, // Tags for each menu item (e.g., "vegan", "gluten-free")
      },
    ],
  },
  { timestamps: true }
);

export const MenuItemsModel = mongoose.model("MenuItems", MenuItemsSchema);