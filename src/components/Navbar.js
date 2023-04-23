import React, { useState, useEffect } from "react";
import './Navbar.css'
import Home from './Restaurants/Home';
import Home1 from './Instamart/Home';
import Home2 from './Account/Home'
import Home3 from './Cart/Home'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [read, setRead] = useState(true);
  const [test, setTest] = useState("");
  const [listening, setListening] = useState(false);
  const [goto, setGoto] = useState(false);

  const navigate = useNavigate();

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
          else if (temp === "gotorestaurants.") {
            navigate("/Restaurants/Home");
          } else if (temp === "gotoaccount.") {
            navigate("/Account/Home");
          } else if (temp === "cart.") {
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

  const handleReading = () => {
    if (read) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();

      // Retrieve the headers from the HTML document
      const headers = document.querySelectorAll("li");
      headers.forEach((header) => {
        utterance.text += header.textContent + " ";
      });

      synth.speak(utterance);
      setRead(false);
    }
  };

  const handleListening = () => {
    setListening(true);
    setGoto(true);
  };

  return (
    <button onMouseOver={handleReading} onClick={handleListening} className='main-button'>
      <>
        <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary mt-2">
            <div className="container-fluid">
              <Link className="navbar-brand" to="#">Swiggy</Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Restaurants/Home">Restaurants</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Instamart/Home">Instamart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Account/Home">Account</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Cart/Home">Cart</Link>
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
