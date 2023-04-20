import React from 'react'
import { useState } from 'react';
import './Navbar.css'
import Home from './Restaurants/Home';
import { Link, Route, Routes } from 'react-router-dom';

const Navbar = () => {

    const speak = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();

        // Retrieve the headers from the HTML document
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p");
        headers.forEach((header) => {
            utterance.text += header.textContent + " ";
        });

        synth.speak(utterance);
    };

    const [test, setTest] = useState("");

    const handleListen = () => {
        const recognition = new window.webkitSpeechRecognition();

        recognition.onstart = () => {
            console.log("Speech recognition listening...");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setTest(transcript);
        };

        recognition.start();
    };

    return (
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
                <button onClick={speak}>speak</button>
                <button onDoubleClick={handleListen}>Listen</button>
                {test}
            </div>
            <Routes>
                <Route exact path="/" element={<Navbar/>} />
                <Route exact path="/Restaurants/Home" element={<Home/>} />
            </Routes>
        </>
    );
}

export default Navbar;
