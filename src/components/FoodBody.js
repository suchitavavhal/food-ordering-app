import React, { useEffect, useState, useRef } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
// import axios from 'axios';

const API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.4608064&lng=73.80808689999999&is-seo-homepage-enabled=false&page_type=DESKTOP_WEB_LISTING";

const FoodBody = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextOffset, setNextOffset] = useState(null);
  const observer = useRef();

  const fetchRestaurants = async (offset) => {
    setLoading(true);
    try {
      console.log(`${API_URL}&nextOffset=${offset}`);

      if (nextOffset === null) {
        const response = await fetch(`${API_URL}&nextOffset=${offset}`);
        const data = await response.json();
        console.log("data", data);
        setRestaurants((prev) => [
          ...prev,
          ...data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants]);

          // setRestaurants(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        console.log(data.data.pageOffset.nextOffset);
        setNextOffset(data.data.pageOffset.nextOffset);
      } else {
        console.log("Post")
        const response = await fetch(`${API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nextOffset: "CJhlELQ4KICI1LDkmsrQZzCnEzgC",
            // page_type: "DESKTOP_WEB_LISTING",
          }),
        });
        const data = await response.json();
        console.log("data", data);
        setRestaurants((prev) => [
          ...prev,
          ...data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants]);
        //   setRestaurants(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        console.log(data.data.pageOffset.nextOffset);
        setNextOffset(data.data.pageOffset.nextOffset);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  // If no dependency array, useEffect is called on every render
// If dependency array is empty =[]= useEffect is called on initial render only
// If dependency array is {btnName} = useEffect is called every time btnName is clicked


  useEffect(() => {
    console.log("useEffect 1");
    fetchRestaurants("");
  }, []);

  const lastRestaurantRef = useRef();
  const handleObserver = (entries) => {
    const lastEntry = entries[0];
    console.log("lastEntry", lastEntry);
    if (lastEntry.isIntersecting && nextOffset) {
      console.log(nextOffset);
      fetchRestaurants(nextOffset);
    }
  };
  useEffect(() => {
    console.log("useEffect 2");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastRestaurantRef.current) {
      console.log("lastRestaurantRef.current", lastRestaurantRef.current);
      observer.current.observe(lastRestaurantRef.current);
      console.log("observer.current", observer.current);
    }

    return () => {
      if (lastRestaurantRef.current) {
        observer.current.unobserve(lastRestaurantRef.current);
      }
    };
  }, [lastRestaurantRef, nextOffset]);

  return (
    <div>
      <h1>Restaurants</h1>
      <div className="res-container">
        {restaurants.map((restaurant, index) => {
          const isLastRestaurant = index === restaurants.length - 1;
          return (
            <>
              {/* <li key={restaurant.info.id} ref={isLastRestaurant ? lastRestaurantRef : null}>
                            {restaurant.info.name}
                        </li>   */}

              {/* <RestaurantCard key={restaurant.info.id} resData={restaurant} /> */}

              <div
                className="res-card"
                key={restaurant.info.id} ref={isLastRestaurant ? lastRestaurantRef : null}
              >
                <img
                  alt="res logo"
                  src={CDN_URL + restaurant.info.cloudinaryImageId}
                />
                <h3>{restaurant.info.name}</h3>
                <h4>{restaurant.info.areaName}</h4> 
              <h4>{restaurant.info.costForTwo}</h4>
                <h5>{restaurant.info.cuisines.join(",")}</h5>
                <h4>{restaurant.info.avgRating}</h4>
                <h5 className="slaString">{restaurant.info.sla.slaString}</h5>
              </div>  
            </>
          );
        })}
      </div>
      {loading && <Shimmer />}
    </div>
  );
};

export default FoodBody;
