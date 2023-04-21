import React from "react";
import { useState,useEffect } from "react";
import './Navbar.css'
import Home from './Restaurants/Home';
import Home1 from './Instamart/Home';
import Home2 from './Account/Home'
import Home3 from './Cart/Home'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [talk, setTalk] = useState(true);
    const [going,setGoing]=useState(false);
    const [listen, setListen] = useState(false);
    const speak = () => {
        if (talk) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance();

            // Retrieve the headers from the HTML document
            const headers = document.querySelectorAll("li");
            headers.forEach((header) => {
                utterance.text += header.textContent + " ";
            });

            synth.speak(utterance);
            utterance.onend=()=>{
                setTimeout(() => {
                    console.log("Hello");
                    setListen(true);
                }, 3000);
            }
        }
    };

    const [test, setTest] = useState("");
    const [go,setGo]=useState(false);
    const handleListen = () => {
        if (listen) {
            setTimeout(()=>{
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance();
                utterance.text+="Recognized";
                synth.speak(utterance);
            },10000);
            setTimeout(()=>{
                const recognition = new window.webkitSpeechRecognition();
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setTest(transcript);
            };
            recognition.start();
            console.log(test);
            recognition.onend=()=>{
                setGo(true);
            }
            },4000);
        }
        else{
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance();
            utterance.text+="Can you speak one more time";
            synth.speak(utterance);
        }
    };

    const navigate = useNavigate();
    const Goto = async() => {
        if (test !== "") {
            var temp = "";
            for (let i in test) {
                if (test[i] !== " ") {
                    temp += test[i];
                } else {
                    temp = "";
                }
                setTest(temp);
                setTimeout(() => {
                    setGoing(true);
                }, 3000);
                if(going){
                    if (temp === "restaurants") {
                        navigate("/Restaurants/Home.js");
                    } else if (temp === "account") {
                        navigate("/Account/Home.js");
                    } else if (temp === "cart") {
                        navigate("/Cart/Home.js");
                    } else if (temp === "instamart") {
                        navigate("/Instamart/Home.js");
                    }
                }
                
            }
        }
    };
    const speakNavigate=()=>{
        if(go){
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance();
             utterance.text+=("Going to the "+test+"page");
             synth.speak(utterance);
        }
    }
    useEffect(() => {
        if (listen) {
            console.log("Function called..");
            handleListen();
        }
        if(go){
            console.log("Navigate");
            Goto();
            setListen(false);
            if(going){
                console.log("going to the page");
                speakNavigate();
            }
        }
    }, [listen,go,going]);

    return (
        <button onClick={speak}  className='main-button'>
            <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary mt-2">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="#">Swiggy</Link>
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
