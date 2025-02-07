import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import About from "./components/About";
import Contact from "./components/ContactUs";
import Error from "./components/Error";
import Body from "./components/Body";

import {createBrowserRouter, RouterProvider} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));

const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Body/>
      },
      {
        path:"/about",
        element: <About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      
    ],
    errorElement:<Error/>
  },
 


])
root.render(
<RouterProvider router= {appRouter}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
