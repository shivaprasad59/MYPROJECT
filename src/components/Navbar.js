import React, { useState, useEffect } from "react";
import './Navbar.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../Assets/Images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Navbar = () => {
  const [read, setRead] = useState(false);
  const [test, setTest] = useState("");
  const [listening, setListening] = useState(false);
  const [goto, setGoto] = useState(false);
   const [details,setDetails]=useState([]);

  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get("http://localhost:5000/login_user");
        console.log(response.data);
        setDetails(response.data);
      }
      catch(e){
        console.log(e);
      }

    }
    fetchData();
  },[])
  useEffect(()=>{
    if(details.length<1){
      const synth=window.speechSynthesis;
      const utterance=new SpeechSynthesisUtterance();
      // utterance.text+="You haven't logged in.Please login first";
      synth.speak(utterance);
      navigate("/Account/Home")
    }
    else{
      const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();

    // Retrieve the headers from the HTML document
    const headers = document.querySelectorAll("li");
    utterance.text+="Hello welcome to our website.This page has the following components.";
    headers.forEach((header) => {
      utterance.text += header.textContent + ".";
    });

    synth.speak(utterance);
    }
  },[])
  useEffect(() => {
    if (listening) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTest(transcript);
        recognition.stop();
        console.log(test);
      };
      recognition.start();
      setListening(false);
    }
  }, [listening]);

  useEffect(() => {
    if (goto && test !== "") {
      let temp = "";
      for (let i = 0; i < test.length; i++) {
        if (test[i] !== " ") {
          temp += test[i];
        } 
    }
         console.log("Temp=="+temp);
         if(temp==="gotohome"){
            navigate("/");
         }
         else if(temp==="gotohelp." || temp==="help." || temp==="need help."){
          navigate("/Help")
         }
          else if (temp === "gotorestaurants.") {
            navigate("/Restaurants/Home");
          } else if (temp === "gotoaccount.") {
            navigate("/Account/Home1");
          } else if (temp === "gotobag.") {
            navigate("/Cart/Home");
          } else if (temp === "gotoinstamart.") {
            navigate("/Instamart/Home");
          }
          temp = "";
    //   console.log("temp"+temp);
      setTest("");
      setGoto(false);
    }
  }, [goto, test, navigate]);

 useEffect(()=>{
  if (read) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();

    // Retrieve the headers from the HTML document
    const headers = document.querySelectorAll("li");
    utterance.text+="Hello welcome to our website.This page has the following components.";
    headers.forEach((header) => {
      utterance.text += header.textContent + ".";
    });

    synth.speak(utterance);
    setRead(false);
  }
 },[read])

  const handleListening = () => {
    setListening(true);
    setGoto(true);
  };

  return (
    <button  onClick={handleListening}  className='main-button'>
      <>
        <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary mt-2">
            <div className="container-fluid">
              <Link className="navbar-brand" to="#"><img src={logo} className="logo"/><h5 className="logo-name">FOOD DELIVERY</h5></Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="#"><h5><FontAwesomeIcon icon={faHome} />Home</h5></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Restaurants/Home"><h5><FontAwesomeIcon icon={faSearch} />Search</h5></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Instamart/Home"><h5><FontAwesomeIcon icon={faUtensils} />Restaurants</h5></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Account/Home"><h5><FontAwesomeIcon icon={faUser} />Account</h5></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Cart/Home"><h5><FontAwesomeIcon icon={faShoppingCart} />Cart</h5></Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        </>
        </button>
  )
}
export default Navbar;
