import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Help = () => {
    useEffect(()=>{
        const synth=window.speechSynthesis;
        const utterance=new SpeechSynthesisUtterance();
        utterance.text+="Hello welcome to the help page,select the module in which you need help,";
        utterance.text+="1,Login,2,SignUp,3,Restaurants,4,cart,";
        utterance.text+="Click anywhere and give input,"
        synth.speak(utterance);
    },[])
    const [test,setTest]=useState("");
    const handleClick=()=>{
        const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setTest(transcript);
      recognition.stop();
      console.log(transcript);
    };
    recognition.start();
    }
    const navigate=useNavigate();
  useEffect(()=>{
    if(test!==""){
        if(test==="home."){
            const synth=window.speechSynthesis;
        const utterance=new SpeechSynthesisUtterance();
        utterance.text+="The home page has the components,Restaurants,Account,cart,click the mouse and give voice input";
        utterance.text+="speak goto keyword before the components name like goto restaurants,It will take you to the restaurants page";
        synth.speak(utterance);
        }
        if(test==="restaurants."){
            const synth=window.speechSynthesis;
        const utterance=new SpeechSynthesisUtterance();
        utterance.text+="The restaurants page on loading will read out the restaurants names that are nearer to you,click the mouse anywhere on the website,and give voice input,";
        utterance.text+="speak goto keyword before the names of the restaurants like goto hyderabad spice,It will take you to the Hyderabad spice  page";
        synth.speak(utterance);
        }
        if(test==="Inrestaurant." || test==="what to say inside the restaurant." || test==="how to add items in the restaurant?"){
            const synth=window.speechSynthesis;
        const utterance=new SpeechSynthesisUtterance();
        utterance.text+="After opening the specified restaurant it will read out the menu ,available in the restaurant,click anywhere on the website and give voice input";
        utterance.text+="speak add, keyword before the items name like add chicken biryani,It will acknowledge,At the end after adding speak submit by clicking ,it will add your items to cart,if you would like to go back the speak go back ,if you would like to look at your cart speak go to cart";
        synth.speak(utterance);
        }
      if(test==="go back."){
        navigate("/");
      }
       if(test==="cart." || test==="I need help in cart."){
       
            const synth=window.speechSynthesis;
        const utterance=new SpeechSynthesisUtterance();
        utterance.text+="After loading the cart page";
        utterance.text+="You will able to hear the items that are present in your cart along with the price of each item and total price at the end if you are okay with the cart then speak deliver";
        synth.speak(utterance);
       }
       if(test==="signup." || test==="login."){
            const synth=window.speechSynthesis;
        const utterance=new SpeechSynthesisUtterance();
        utterance.text+="The signup and login pages are similar";
        utterance.text+="Each and every time you have to click the mouse to give input at the end after providing all details click one more time on the website";
        synth.speak(utterance);
       }
    }
  },[test])
  return (
    <button onClick={handleClick}>
        <div>Help</div>
    </button>
  )
}

export default Help