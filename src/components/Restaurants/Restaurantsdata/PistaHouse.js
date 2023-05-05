import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PistaHouse = () => {
  const [data,setData]=useState([]);
  const [cart,setCart]=useState([]);
  const [test,setTest]=useState("");
  const [listen,setListen]=useState(false);
  const [read,setRead]=useState(false);
  const [id,setId]=useState(0);
  const [submit,setSubmit]=useState(false);
  const [go,setGo]=useState(false);
  useEffect(()=>{
   
    if (data.length!==0) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();

      // Retrieve the headers from the HTML document
      const headers = document.querySelectorAll("h6");
      utterance.text += "The Menu in the Dominos is";
      headers.forEach((header) => {
        utterance.text += header.textContent + ". ";
      });

      synth.speak(utterance);
      setRead(false);
    }
  }
,[data])
useEffect(() => {
  if (listen) {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setTest(transcript);
      recognition.stop();
      console.log(transcript);
    };
    recognition.start();
    setListen(false);
  }
}, [listen]);

useEffect(()=>{
  if(test!==""){
     console.log("test="+test);
     const synth=window.speechSynthesis;
     const utterance=new SpeechSynthesisUtterance();
     const x="";
     if(test==="add 4 cheese pizza."){
      utterance.text+="Added four cheese pizza."
       setId(5);
     }
     if(test==="add non veg supreme."){
      utterance.text+="Added non veg supreme."
       setId(6);
     }
     if(test==="add pepper bbq chicken."){
      utterance.text+="Added pepper bbq chicken.."
       setId(7);
     }
     if(test==="add cheesy meatballs."){
      utterance.text+="Added cheesy meatballs."
       setId(8);
     }
     if(test==="submit."){
      console.log(cart);
      setSubmit(true);
     }
     if(test==="go to cart."){
      utterance.text+="Going to the cart page.";
      navigate("/Cart/Home")
      setGo(true);
      
     }
     if(test==="go back."){
      utterance.text+="Going to the previous page";
      navigate("/Restaurants/Home");
      setGo(true);
     }
     synth.speak(utterance);
     setTest("");
  }
},[test]);
useEffect(()=>{
   if(cart.length!==0){
    console.log(cart);
   }
},[cart])

useEffect(()=>{
  if(id!==0){
    let x="";
    for(let i of data){
      if(i.Id===id){
        x=i;
        break;
      }
    }
    setCart([...cart,x]);

  }
},[id])
const navigate=useNavigate();
useEffect(()=>{

},[go])
useEffect(()=>{
  if(submit){
    for(let i=0;i<cart.length;i++){
      const handleSubmit=async()=>{
        try{
          const response=await axios.post("http://localhost:5000/cart",{
            Id:cart[i].Id,
            Item_name:cart[i].Item_name,
            Price:cart[i].Price,
            Quantity:cart[i].Quantity,
            Image:cart[i].Image
          })
          console.log(response);
        }
        catch(e){
          console.log(e);
        }
      }
      handleSubmit();
    }
    setSubmit(false);
  }
},[submit])
const handleClick=()=>{
  setListen(true);
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Dominos");
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

export default PistaHouse


// import React from 'react'

// const PistaHouse = () => {
//   return (
//     <div>PistaHouse</div>
//   )
// }

// export default PistaHouse