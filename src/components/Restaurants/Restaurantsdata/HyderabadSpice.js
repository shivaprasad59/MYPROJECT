import axios from 'axios';
import React, { useEffect, useState } from 'react'

const HyderabadSpice = () => {
  const [data,setData]=useState([]);
  const [cart,setCart]=useState([]);
  const [x,setX]=useState("");
  const [read,setRead]=useState(true);
  useEffect(()=>{
   
    if (read) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();

      // Retrieve the headers from the HTML document
      const headers = document.querySelectorAll("h4", "h6");
      utterance.text += "The restaurants nearer to you are.";
      headers.forEach((header) => {
        utterance.text += header.textContent + ". ";
      });

      synth.speak(utterance);
      setRead(false);
    }
  }
,[read])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Hyderabaspicedata");
        setData(response.data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='restaurant-menu'>
     {
      data.map((item)=>{
        return(
          <div key={item.id}>
            <img src={item.Image}/>
          <h4>Item-Name:{item.Item_name}</h4>
           <h4>Price:{item.Price}</h4>
           <h4>Quantity:{item.Quantity}</h4>

        </div>
        )
      })
     }
    </div>
  )
}

export default HyderabadSpice