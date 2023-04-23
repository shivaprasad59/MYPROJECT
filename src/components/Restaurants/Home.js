import React from 'react'
import data from '../Restaurants/Restaurantsdata'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [read, setRead] = useState(true);
  const [test, setTest] = useState("");
  const [listening, setListening] = useState(false);
  const [goto, setGoto] = useState(false);
  const [read1,setRead1]=useState(true);
   useEffect(()=>{
   if(read1){
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text+="Welcome to the restaurants page";
    synth.speak(utterance);
    setRead1(false);
   }
   },[read1])
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
         if(temp==="gotohome."){
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
      const headers = document.querySelectorAll("h5","p");
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
        <button onMouseOver={handleReading} onClick={handleListening}>
            <div >
         <h1>Restaurants page</h1>
            <div>
                {data.map((item) => {
                    return (
                        <div className='restaurants-data' key={item.id}>
                            <div className="card" style={{ width: "18rem" }} >
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <h5 className="rating">{item.rating}</h5>
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