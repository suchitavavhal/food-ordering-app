import {CDN_URL} from '../utils/constants'

const RestaurantCard=({resData})=>{
    // const {resName, cuisine} = resData;
    console.log(resData)
  
    return (
      <div className="res-card">
        <img alt="res logo" src={CDN_URL + resData.info.cloudinaryImageId} />
         <p className="rest-name">{resData.info.name}</p>
        <p>{resData.info.areaName}</p>
        <p>{resData.info.costForTwo}</p>
        <p>{resData.info.cuisines.join(',')}</p>
        <p>{resData.info.avgRating}</p>
        <p className="slaString">{resData.info.sla.slaString}</p>
       
      </div>

      
    )
  }
// Higher Order Component
export const withOffer = (RestaurantCard)=>{
  return (props)=>{
    console.log("props",props)

    return (
      <div>
        {/* <label>{props.info.aggregatedDiscountInfoV3.header} {props.info.aggregatedDiscountInfoV3.subHeader}</label> */}
        <label className="offer-label text-white"> {props.resData.info.aggregatedDiscountInfoV3.header}  {props.resData.info.aggregatedDiscountInfoV3.subHeader}</label>
        <RestaurantCard {...props}/>
      </div>
    )

  }

}


  export default RestaurantCard;