import { CDN_URL } from "../utils/constants";

const ItemList =({items})=>{

    console.log("items", items)
    return(
        <>
        {items.map((item) => {
        return (
          <div key={item.card.info.id} className="d-flex justify-content-between mt-5 mb-3 pb-5 border-bottom">
            <div className="">
            <ul className="menu-card ">
            
            
            <li className="item-card-name">
              {item.card.info.name} 
             
            </li>
            
            <li>
              <div className=" item-card-box">
                <div className="me-1">&#x20B9;</div>
                <div >
                  {(item.card.info.price / 100) ||(item.card.info.defaultPrice / 100)}
                </div>
              </div>
            {/* <span className="me-2 item-card-price ">&#x20B9;</span>
            {(item.card.info.price / 100) ||(item.card.info.defaultPrice / 100)} */}
            </li>

            {/* <li>{item?.card?.info?.ribbon?.text}</li> */}

            <li>
              {(item?.card?.info?.ratings?.aggregatedRating?.rating)?       
              <div className="item-card-box">
                <div className="me-2">&#9733;</div>
                <div >
                  <span className="item-card-ratings">  {item?.card?.info?.ratings?.aggregatedRating?.rating} -</span>
                 <span>(
                    {item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span>
                </div>
            
            </div> :  null}

      
            </li>

            <li>
              {/* {item?.card?.info?.description} */}
            </li>
          </ul>
            </div>
            <div>
            <img className ="item-card-image" alt="res logo" src={CDN_URL + item?.card?.info?.imageId}  />
            </div>
       
        
          </div>
        );
      })}
        </>

    )
}

export default ItemList;