import axios from 'axios';
import React, { useEffect, useState } from 'react'

const HyderabadSpice = () => {
  const [data,setData]=useState([]);
  const [cart,setCart]=useState([]);
  const [x,setX]=useState("");
  const [listen,setListen]=useState(false);
  const [read,setRead]=useState(false);
  useEffect(()=>{
   
    if (data.length!==0) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();

      // Retrieve the headers from the HTML document
      const headers = document.querySelectorAll("h6");
      utterance.text += "The Menu in the Hyderabad spice is.";
      headers.forEach((header) => {
        utterance.text += header.textContent + ". ";
      });

      synth.speak(utterance);
      setRead(false);
    }
  }
,[data])
useEffect(()=>{
  if(listen){
    
    const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        console.log("Listening...");
        const transcript = event.results[0][0].transcript.toLowerCase();
        
        setX(transcript);
        recognition.stop();
        console.log(transcript);
        // if(transcript==="add chicken biryani single."){
        //   const y={
        //     title:"Chicken biryani single",
        //     Price:150
        //   }
        //   setCart([...cart,y]);
        // }
        console.log(cart);
      };
      recognition.start();
      if(x!==""){
        console.log(x);
        setListen(false);
      }
  }
  console.log(cart);
},[listen])
const handleClick=()=>{
  setListen(true);
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Hyderabaspicedata");
        setData(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    setRead(true);
  }, []);

  return (
    <button className='hyderabad-spice' onClick={handleClick}>
      <div className='restaurant-menu'>
     {
      data.map((item)=>{
        return(
          <div key={item.id}>
            <img src={item.Image}/>
          <h6>Item-Name:{item.Item_name}</h6>
           <h6>Price:{item.Price}</h6>
           <i>Quantity:{item.Quantity}</i>

        </div>
        )
      })
     }
    </div>
    </button>
  )
}

export default HyderabadSpice