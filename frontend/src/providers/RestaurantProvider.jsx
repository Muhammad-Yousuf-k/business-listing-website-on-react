import { useState, useRef } from "react";
// import { toast } from "react-toastify";

import api from "../api/interceptors";

import { RestaurantContext } from "../context/RestaurantContext";

const RestaurantProvider = ({ children }) => {

  const [restaurants, setRestaurants] = useState({
    _id: "",
    name: "",
    description: "",
    main_category: "",
    features: [""],
    rating: "",
  });
  const [restaurant, setRestaurant] = useState({});
  const lastQuery = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Create Restaurant Listing */
  const createRestaurant = async (payload) => {
    setLoading(true);

    try {
      const res = await api.post("/restaurant-api/create-restaurant-listing", payload);

      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "listing failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* Create Restaurant Listing */
  const get_all_restaurant = async () => {
    setLoading(true);

    try {
      const res = await api.get("/restaurant-api/get-all-restaurant-listing");
      // console.log(res.data);


      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "listing failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* Create Restaurant Listing */
  const search_restaurants = async (queryString) => {
    setLoading(true);
    if (queryString === lastQuery.current) return;

    try {
      const res = await api.get(`/restaurant-api/search/?${queryString}`);
      console.log(res.data);
      lastQuery.current = queryString;
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "listing failed");
      return false;
    } finally {
      setLoading(false);
    }
  };






  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        restaurant,
        loading,
        error,
        createRestaurant,
        get_all_restaurant,
        search_restaurants,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};



export default RestaurantProvider;