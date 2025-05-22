import React, { useState, useEffect, Suspense } from "react";
import {Link} from 'react-router-dom';

import RestaurantCard, { withOffer } from "./RestaurantCard";
import Shimmer from "./Shimmer";

import useOnlineStatus from "../utils/useOnlineStatus";
// import restaurants from "../utils/mockData";

const Body = () => {
  // Local State Variables
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [btnName, setBtnName]= useState('Top Rated Restaurants');
  const onlineStatus= useOnlineStatus();
  const WithOfferRestaurant = withOffer(RestaurantCard);

  console.log("filteredData", filteredData);

  const [searchText, setSearchText] = useState("");

  // whenever state variables update, react triggers a reconciliation cycle (re-renders the component)
  console.log("Body render");

  useEffect(() => {
    console.log("useEffect");
    fetchData();

    const timer= setInterval(()=>{
      console.log('body timer')
    },1000)

    return()=>{
      clearInterval(timer);
      console.log('interval cleared')

    }
  }, []);

  const fetchData = async () => {
    if (!hasMore) return;

    setLoading(true);

    const api = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.4608064&lng=73.80808689999999&nextOffset=CJhlELQ4KICoopeCv8zsWDCnEzgD&is-seo-homepage-enabled=false&page_type=DESKTOP_WEB_LISTING`;

    try {
      const data = await fetch(api);

      if (!data.ok) {
        throw new Error("Network Response Error");
      }

      const json = await data.json();

      console.log(json);

      // const restaurantList = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      const restaurantList = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      console.log(restaurantList);

     

      // setList((prev) => [...prev, ...restaurantList]);
    
      setList((prev)=>[...prev , ...restaurantList]);
      setFilteredData(restaurantList);
      // setFilteredData((prev) => [...prev, ...restaurantList]);

      // setHasMore(restaurantList.length > 0);
    } catch {
      // setError(error.message);
      setError(error);
    } finally {
      setLoading(false);
      // setPage(page+1);
    }
  };

  
    // if(!loading){
    //   setPage( (prev)=> (prev+1))
    // }
  

  // Conditional Rendering
  if (error) return <div>Error: {error}</div>;
  if(onlineStatus===false){
    return (
      <>
      <h1>
       Looks like you are Offline!!! Please check your interent connection!!!
      </h1>
      </>
    )
  }
  

  return list.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search-box">
          <input
            type="text"
            className="search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              console.log(searchText);
            }}
          />
          <button
            onClick={() => {
              console.log(searchText);
              const filteredRest = list.filter((restaurant) =>
                restaurant.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              console.log("filteredRestaurant", filteredRest);
              setFilteredData(filteredRest);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="mt-5 mb-5"
          
          onClick={() => {

            btnName==='Top Rated Restaurants'? setBtnName('All Restaurants'):  setBtnName('Top Rated Restaurants');

            if(btnName==='Top Rated Restaurants'){

              const filteredList = list.filter(
                (restaurant) => restaurant.info.avgRating > 4.3
              );
  
              setFilteredData(filteredList);
            }
            else{

            
  
              setFilteredData(list);
            }
            
          }}
        >
        {btnName}
        </button>
      </div>
      <div className="res-container">
        {filteredData.map((restaurant) => (
          <>
          {/*  use index as a key as a last resort, use id from the data as key (always recommended) */}
         <Link key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}  style={{ textDecoration: 'none' }}> 

         {restaurant.info.aggregatedDiscountInfoV3? (<WithOfferRestaurant resData={restaurant}/>):(<RestaurantCard  resData={restaurant} />)}
         
         
         
         </Link>
         
          </>
        ))}

{/* <Suspense fallback={<div> Loading....</div>}>

</Suspense> */}
      </div>
    </div>
  );
};
export default Body;
// export default list;
