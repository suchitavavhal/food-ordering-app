// import {useState} from "react"
import ItemList from "./ItemList";

const RestaurantCategory =({data, showItems, setShowIndex})=>{
    console.log(data)

   const {title, itemCards}= data;
//    const [showItems, setShowItems]=useState(false);

   const handleClick=()=>{
        console.log("handle clicked");
        setShowIndex();
   }
    return(
    <div className="d-flex justify-content-around">

        {/* <h1>{title}</h1> */}
        {/* Header */}
        <div className="bg-light bg-gradient shadow p-3 mb-5 bg-body rounded  w-50 accordion accordion-flush">
            <div className="d-flex justify-content-between" onClick={handleClick}>

            <span className="fw-bolder text-info">{title} ({itemCards.length})</span>
            <span>🔽</span>
            </div>
            <div>

       {showItems && <ItemList items={itemCards}/>}
            </div>

        </div>

        {/* Body */}

    </div>
)

}

export default RestaurantCategory;