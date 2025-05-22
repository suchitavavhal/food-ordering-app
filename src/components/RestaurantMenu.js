// import { useEffect, useState } from "react";
import {useState} from "react";
import Shimmer from "./Shimmer";
import { CDN_URL, FOOD_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import {useParams} from "react-router-dom";
import RestaurantCategory from "./RestarantCategory";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  const {resId} = useParams();
  console.log(resId)


  // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.4642133&lng=73.80874969999999&restaurantId=21395&catalog_qa=undefined&submitAction=ENTER
  // useRestaurantMenu is custom hook

  const resInfo= useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  // const fetchMenu = async () => {
   
  //   const response = await fetch(MENU_URL+resId);
  //   // const response = await fetch ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.4608064&lng=73.80808689999999&nextOffset=CJhlELQ4KICoopeCv8zsWDCnEzgD&is-seo-homepage-enabled=false&page_type=DESKTOP_WEB_LISTING");
  //   const data = await response.json();
  //   console.log("menu data", data.data);
  //   // setResInfo(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.info?.name);
  //   setResInfo(data.data);
  //   console.log("res info", resInfo);
  // };

  if (resInfo === null) return <Shimmer />;

  const {name, costForTwoMessage, cuisines, areaName, totalRatingsString, cloudinaryImageId} = resInfo?.cards[2]?.card?.card?.info;

  const itemCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.itemCards;
  console.log("itemcards", itemCards);


  const categories=  resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>
  
    c.card?.["card"]?.["@type"]=== "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  )

  console.log("categories",categories)
  return (
    <div className="menu">
       <img alt="res logo" src={CDN_URL + cloudinaryImageId} className="" />
    <div> 
     <h1> {name}</h1>
        <div className= "menu-header">
        <span> {totalRatingsString}</span>
        <span className="cost"> {costForTwoMessage}</span>
      
       
        </div> 
        <div className="menu-header1">
        <p> {areaName}</p>
        <p className="red"> {cuisines.join(", ")} </p> 
        </div> 
     
      
       </div>  
       
       <h2 className="text-3xl font-bold underline ">Menu</h2> 
       {/* categories */}

      {/* {itemCards.map((item) => {
        return (
          <div key={item.card.info.id}>
            <ul className="menu-card">
            
            
              <li>
                {item.card.info.name} - Rs.
                {(item.card.info.price / 100) ||(item.card.info.defaultPrice / 100)}
               
              </li>

              <li>{item?.card?.info?.ribbon?.text}</li>

              <li>
                {item?.card?.info?.ratings?.aggregatedRating?.rating} - (
                {item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})
              </li>
            </ul>
            {console.log(item.card.info.name)}
            {console.log(item.card.info.id)}
          </div>
        );
      })} */}

      {categories.map((category, index)=>(
        
        <RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card} showItems={index===showIndex ?true:false} setShowIndex={()=>setShowIndex(index)}/>
      ))} 
    </div>
  );
};

export default RestaurantMenu;
