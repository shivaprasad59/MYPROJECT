import React, { useEffect } from 'react'
import { useState } from 'react';
import './Navbar.css'
import Home from './Restaurants/Home';
import Home1 from './Instamart/Home';
import Home2 from './Account/Home'
import Home3 from './Cart/Home'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [talk,setTalk]=useState(true);
    const speak = () => {
       if(talk){
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();

        // Retrieve the headers from the HTML document
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p");
        headers.forEach((header) => {
            utterance.text += header.textContent + " ";
        });

        synth.speak(utterance);
       }
       setTimeout(()=>{

       }, 500);
        setTalk(false);
    };
   
    const [test, setTest] = useState("");

    const handleListen = () => {
        const recognition = new window.webkitSpeechRecognition();


        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setTest(transcript);
        };

        recognition.start();
    };
    const navigate = useNavigate();
    const Goto = () => {
        if (test !== "") {
            if (test === "Go to restaurants.") {
                navigate("/Restaurants/Home.js");
            }
            else if (test === "Go to account.") {
                navigate("/Account/Home.js");
            }
            else if (test === "Go to cart.") {
                navigate("/Cart/Home.js");
            }
            else if (test === "Go to instamart.") {
                navigate("/Instamart/Home.js");
            }
        }
    }
    useEffect(() => {
        Goto();
    }, [test])
    if(talk===false){
        handleListen();
    }
  
    return (
        <button onClick={speak} className='main-button'>
            <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary mt-2">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="#">Swiggy</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/Restaurants/Home">Restaurants</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" href="#">Instamart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" href="#">Account</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" href="#">Cart</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
            </div>
            <Routes>
                <Route exact path='/' />
                <Route exact path="/Restaurants/Home.js" element={<Home />} />
                <Route exact path="/Instamart/Home.js" element={<Home1 />} />
                <Route exact path="/Account/Home.js" element={<Home2 />} />
                <Route exact path="/Cart/Home.js" element={<Home3 />} />
            </Routes>
        </>
        </button>
    );
}

export default Navbar;
