import React, { useEffect, useState } from 'react'
import '../Account/Home.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
  const [click,setClick]=useState(0);
  const [loggedin,setLoggedin]=useState(false);
  const [test,setTest]=useState("");
  const [user,setUser]=useState(false);
  const [logindetails,setloginDetails]=useState([]);
  
  useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await axios.get(" http://localhost:5000/Users");
            //  console.log(response.data);
             setloginDetails(response.data);
        }
        catch(e){
          console.log("error");
        }
      }
      fetchData();
      // setUser(true);
  },[])
  
  useEffect(()=>{
    if(logindetails.length<1){
    setLoggedin(true);
    }
    else{
      setloginDetails(logindetails[1]);
    }
  },[user])
  useEffect(()=>{
   if(loggedin){
    const synth=window.speechSynthesis;
    const utterance=new window.SpeechSynthesisUtterance;
    utterance.text+="Have you signed up in our website.";
    utterance.text+="Say yes. for login. and no. for signup. by clicking one time anywhere";
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
    if(test==="yes." || test==="s."){
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
          {
            logindetails.map((item)=>{
              return(
                <div>
                  <ul>
                    <li>
                      {item.username}
                    </li>
                    <li>
                      {item.mobile}
                    </li>
                    <li>
                      {item.address}
                    </li>
                  </ul>
                </div>
              )
            })
          }
      </button>
    </div>
  )
}

export default Home