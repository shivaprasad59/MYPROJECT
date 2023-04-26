import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Restaurants/Home";
import { Route,Routes } from "react-router-dom";
import Account from "./components/Account/Home";
import Login from "./components/Account/Login";
import Signup from "./components/Account/Signup";
import Cart from "./components/Cart/Home";
import HyderabadSpice from "./components/Restaurants/Restaurantsdata/HyderabadSpice";
import Paradise from "./components/Restaurants/Restaurantsdata/Paradise";
import ChefsAvenue from "./components/Restaurants/Restaurantsdata/ChefsAvenue";
import PistaHouse from "./components/Restaurants/Restaurantsdata/PistaHouse";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home1 from './components/Home'

function App() {
  return(
    <>
     <div className="main-body">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home1/>} />
        <Route path="/Restaurants/Home" element={<Home/>}/>
        <Route path="/Account/Home" element={<Account/>}/>
        <Route path="/Cart/Home" element={<Cart/>}/>
        <Route path="/Account/Login" element={<Login/>}/>
        <Route path="/Account/Signup" element={<Signup/>}/>
        <Route path="/Restaurants/HyderabadSpice" element={<HyderabadSpice/>}/>
        <Route path="/Restaurants/Paradise" element={<Paradise/>}/>
        <Route path="/Restaurants/PistaHouse" element={<PistaHouse/>}/>
        <Route path="/Restaurants/Dominos" element={<ChefsAvenue/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App;
