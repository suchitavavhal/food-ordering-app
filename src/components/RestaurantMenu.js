// import { useEffect, useState } from "react";
import {useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import { CDN_URL} from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import {useParams} from "react-router-dom";
import RestaurantCategory from "./RestarantCategory";

const RestaurantMenu = () => {

  const {resId} = useParams();
  console.log(resId)
  // useRestaurantMenu is custom hook

  const resInfo= useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
    const [loading, setLoading] = useState(true);

  // const [resInfo, setResInfo] = useState(null);

  // useEffect(() => {
  //   async function fetchMenu() {
  //     try {
  //       const res = await fetch(`http://localhost:5000//restaurants-puppeteer?restaurantId=${resId}`);
  //       const data = await res.json();
  //       setResInfo(data);
  //     } catch (err) {
  //       console.error("Error fetching menu:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchMenu();
  // }, [resId]);



  if (resInfo === null) return <Shimmer />;
  console.log("resInfo", resInfo)

    if (!resInfo) return <h2>No data found</h2>;

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



      {categories.map((category, index)=>(
        
        <RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card} showItems={index===showIndex ?true:false} setShowIndex={()=>setShowIndex(index)}/>
      ))} 
    </div>
  );
};

export default RestaurantMenu;
