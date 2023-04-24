import React, { useEffect, useState } from 'react'
import '../Account/Home.css'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [click,setClick]=useState(0);
  const [loggedin,setLoggedin]=useState(true);
  const [test,setTest]=useState("");
  useEffect(()=>{
   if(loggedin){
    const synth=window.speechSynthesis;
    const utterance=new window.SpeechSynthesisUtterance;
    utterance.text+="Have you signed up in our website";
    utterance.text+="Say yes for login and no for signup by clicking one time anywhere";
    synth.speak(utterance);
    setLoggedin(false);
   }
  },[loggedin])
  const handleClick=()=>{
    setClick(click+1);
  }
  useEffect(()=>{
    if(click===1){
      console.log("Clicked 1 time");
      const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTest(transcript);
        recognition.stop();
       
      };
      recognition.start();
      console.log(test);
    }
  },[click])
  const navigate=useNavigate();
  useEffect(()=>{
    console.log(test);
   if(click===2){
    console.log("Clicked 2 times");
    if(test==="yes."){
      navigate("/Account/Login");
    }
    else{
      navigate("/Account/Signup");
    }
   }
  },[click])
  return (
    <div>
      <button onClick={handleClick}>
          This is the home page of the accounts;
      </button>
    </div>
  )
}

export default Home