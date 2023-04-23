import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Restaurants/Home";
import { Route,Routes } from "react-router-dom";
import Account from "./components/Account/Home";
import Cart from "./components/Cart/Home";
function App() {
  return(
    <>
     <div>
      <Routes>
        <Route path="/" element={<Navbar/>} />
        <Route path="/Restaurants/Home" element={<Home/>}/>
        <Route path="/Account/Home" element={<Account/>}/>
        <Route path="/Cart/Home" element={<Cart/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App;
