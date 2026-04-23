import {useEffect, useState} from 'react';
import {MENU_URL} from './constants';


const useRestaurantMenu=(resID)=>{
    console.log("resID", resID)

  console.log("menu url", MENU_URL+resID)

    const [resInfo, setResInfo]= useState(null);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData= async ()=>{
        // const data= await fetch(`http://localhost:5000/restaurants-puppeteer?restaurantId=${resId}`);
        const data= await fetch(MENU_URL+resID);
      
        const json= await data.json();
        console.log(json.data)
        setResInfo(json.data)
    }


    return resInfo;
}

export default useRestaurantMenu;