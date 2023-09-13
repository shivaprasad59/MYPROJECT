import React from 'react'
import data from '../Restaurants/Restaurantsdata'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
const Home = () => {
  const [read, setRead] = useState(true);
  const [test, setTest] = useState("");
  const [listening, setListening] = useState(false);
  const [goto, setGoto] = useState(false);
  const [read1, setRead1] = useState(true);
  useEffect(() => {
    if (read1) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text += "Welcome to the restaurants page";
      synth.speak(utterance);
      setRead1(false);
    }
  }, [read1])
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
      console.log("Temp==" + temp);
      if (temp === "gotohome.") {
        navigate("/");
      }
      else if (temp === "restaurants.") {
        navigate("/Restaurants/Home");
      } else if (temp === "gotoaccount.") {
        navigate("/Account/Home");
      } else if (temp === "bag.") {
        navigate("/Cart/Home");
      } else if (temp === "instamart.") {
        navigate("/Instamart/Home");
      }
      else if (temp === "gotohyderabadspice.") {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();

        // Retrieve the headers from the HTML document
        utterance.text += "Going to the hyderabad spice menu";
        synth.speak(utterance);
        navigate("/Restaurants/HyderabadSpice");


      }
      else if(temp==="gotohelp." || temp==="help." || temp==="need help."){
        navigate("/Help")
       }
      else if (temp === "gotoparadise.") {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();

        // Retrieve the headers from the HTML document
        utterance.text += "Going to the Paradise menu";
        synth.speak(utterance);
        navigate("/Restaurants/Paradise");


      }
      else if (temp === "gotodomino's.") {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();

        // Retrieve the headers from the HTML document
        utterance.text += "Going to the Dominos menu";
        synth.speak(utterance);
        navigate("/Restaurants/PistaHouse");


      }
      else if (temp === "gotopistahouse.") {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();

        // Retrieve the headers from the HTML document
        utterance.text += "Going to the Pista House Menu";
        synth.speak(utterance);
        navigate("/Restaurants/PistaHous");


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
        const headers = document.querySelectorAll("h6");
        utterance.text += "The restaurants nearer to you are.";
        headers.forEach((header) => {
          utterance.text += header.textContent + ". ";
        });
  
        synth.speak(utterance);
        setRead(false);
      }
    }
  ,[read])

  const handleListening = () => {
    setListening(true);
    setGoto(true);
  };

  return (
    <button  onClick={handleListening}>
      <div >
        <h1>Restaurants page</h1>
        <div className='restaurants'>
          {data.map((item) => {
            return (
              <div className='restaurants-data' key={item.id}>
                <div className="card"  >
                  <img src={item.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h6 className="card-title">{item.name}</h6>
                    <h6 className="card-text">{item.description}</h6>
                    <h6 className="rating">Rating {item.rating}</h6>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </button>

  )
}

export default Home