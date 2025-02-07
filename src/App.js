import logo from "./logo.svg";
import "./App.css";
import Header from './components/Header';
import Body from './components/Body';
import FoodBody from './components/FoodBody';
import {Outlet} from 'react-router-dom'



// https://innovist.com/pages/bare-anatomy-store
// https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.89960&lng=80.22090&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING
  







function App() {
  return (
    <div className="App">
      <Header />
      <Outlet/>
      {/* <FoodBody/> */}
    </div>
  );
}

export default App;
