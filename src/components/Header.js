import {LOGO_URL} from '../utils/constants';

import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';

const Header = () => {
    // const appLogo =
    const [btnName, setBtnName]= useState('Login');
    const onlineStatus= useOnlineStatus();
    const useContextData= useContext(UserContext);
    console.log("useContext", useContextData)
    
    const {loggedInUser}= useContextData;
    console.log("loggedInUser", loggedInUser)

    return (
      <div className="header">
        <div className="logo-container">
        <Link to="/">   <img className="logo" src={LOGO_URL} alt="logo" /></Link>
        </div>
        <div className="nav-items header-font">
          <ul className="d-flex  align-items-center fs-5">
            <li>Online Status : {onlineStatus? "🟢": "🔴"}</li>
            <li><Link to="/" className="header-items">Home</Link></li>
              <li><Link to="/about" className="header-items">About Us</Link></li>
             <li><Link to="/contact" className="header-items"> Contact Us</Link></li>
             <li><Link to="/grocery" className="header-items"> Grocery</Link></li>
          
            <li>Cart</li>
            <li><button className="login" onClick={()=>{
              btnName==='Login'? setBtnName('Logout'):  setBtnName('Login')}
              
              }>{btnName}</button>
              </li>

              <li className="fw-bold">{loggedInUser}</li>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;