import { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error("useRestaurant must be used inside RestaurantProvider");
  }

  return context;
};
