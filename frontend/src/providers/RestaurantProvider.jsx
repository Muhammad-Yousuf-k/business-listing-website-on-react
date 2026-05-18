import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../api/interceptors";
import { RestaurantContext } from "../context/RestaurantContext";

const RestaurantProvider = ({ children }) => {
  const lastQuery = useRef(null);

  const [listing, setListing] = useState({
    restaurants: [],
    restaurant: {},
  });

  const [searchResult, setSearchResult] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /* Create Restaurant Listing */
  const createRestaurant = async (payload) => {
    setLoading(true);


    try {
      const res = await api.post("/restaurant-api/create-restaurant-listing", payload);

      setError(null);
      setSuccess(res)
      return true;
    } catch (err) {
      setError(err || "listing failed");
      return false;
    } finally {
      setLoading(false);
    }
  };
  /* Create Restaurant Listing */
  const get_restaurantById = async (_id) => {
    setLoading(true);

    try {

      const res = await api.get(`/restaurant-api/get-restaurant-listing/${_id}`);

      setListing((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          data: res?.data?.restaurant,
          reviews: res?.data?.reviews,
          menu: res?.data?.menuItems,
        },
      }));

      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "listing failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (restaurantId, rating, text) => {
    setLoading(true);
    try {
      const res = await api.post("/review-api/create-review", {
        restaurantId,
        rating,
        text
      });

      setError(null);
      setSuccess(res)
      return true;
    } catch (err) {
      setError(err || "review failed");
      return false;
    } finally {
      setLoading(false);
    }



  }
  const createMenu = async (restaurantId, name, description, price, image, foodCategory, tags) => {
    setLoading(true);
    try {
      const res = await api.post("/menu-api/create-menu", {
        restaurantId,
        name,
        description,
        price,
        image,
        foodCategory,
        tags,
      });

      setError(null);
      setSuccess(res)
      return true;
    } catch (err) {
      setError(err || "menu failed");
      return false;
    } finally {
      setLoading(false);
    }



  }


  const saveListing = (_id) => {
    console.log(_id);

    setError(null)

  }

  /* Create Restaurant Listing */
  const search_restaurants = async (queryString) => {
    setLoading(true);
    if (queryString === lastQuery.current) return;

    try {
      const res = await api.get(`/restaurant-api/search/?${queryString}`);
      setSearchResult(res?.data?.result)
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

  const errorHandler = (err) => {

    if (error === null) { return }
    toast.error(err?.response?.data?.message || "something went wrong");
    setError(null)

  }

  const successHandler = (success) => {

    if (success === null) { return }
    toast.success(success?.data?.message || "work done");
    setSuccess(null)

  }

  useEffect(() => {
    const get_all_restaurant = async () => {
      setLoading(true);

      try {
        const res = await api.get("/restaurant-api/get-best-restaurant-listing");


        setListing((prev) => ({
          ...prev,
          restaurants: res?.data?.restaurants || [],
        }));

        setError(null);
        return true;
      } catch (err) {
        setError(err || "listing fetch failed");
        return false;
      } finally {
        setLoading(false);
      }
    };
    const get_latest_review = async () => {
      setLoading(true);

      try {
        const res = await api.get("/review-api/get-latest-review");

        setReviews(res?.data?.reviews || []);

        setError(null);
        return true;
      } catch (err) {
        setError(err || "review fetch failed");
        return false;
      } finally {
        setLoading(false);
      }
    };
    get_all_restaurant()
    get_latest_review()
    // createMenu("6a0a6d17f1e8d2ac240aa89f", "name", "description", 343, "", "BBQ", "tags")
  }, [])

  useEffect(() => {
    // console.log("listing updated:", listing);
    // console.log("reviews:", reviews);
    // console.log("searchResult:", searchResult);
  }, [listing, reviews, searchResult]);


  useEffect(() => {
    errorHandler(error)
    successHandler(success)
  }, [error, success])






  return (
    <RestaurantContext.Provider
      value={{
        listing,
        searchResult,
        loading,
        error,
        reviews,
        get_restaurantById,
        createRestaurant,
        search_restaurants,
        saveListing,
        createReview,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};



export default RestaurantProvider;