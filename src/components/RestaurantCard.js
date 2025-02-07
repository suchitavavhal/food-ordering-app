import {CDN_URL} from '../utils/constants'

const RestaurantCard=({resData})=>{
    // const {resName, cuisine} = resData;
    console.log(resData)
  
    return (
      <div className="res-card">
        <img alt="res logo" src={CDN_URL + resData.info.cloudinaryImageId} />
         <h3>{resData.info.name}</h3>
        <h4>{resData.info.areaName}</h4>
        <h4>{resData.info.costForTwo}</h4>
        <h5>{resData.info.cuisines.join(',')}</h5>
        <h4>{resData.info.avgRating}</h4>
        <h5 className="slaString">{resData.info.sla.slaString}</h5>
       
      </div>

      
    )
  }

  export default RestaurantCard;