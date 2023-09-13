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
          const response=await axios.get(" http://localhost:5000/login_user");
            //  console.log(response.data);
             setloginDetails(response.data);
            //  setLoggedin(true);
        }
        catch(e){
          console.log("error");
        }
      }
      fetchData();
      // setUser(true);
  },[])
  useEffect(()=>{
    if(logindetails.length!==0){
      setUser(true);
    }
  },[logindetails]);
  useEffect(()=>{
    if(logindetails.length<1 && user){
    setLoggedin(true);
    }
    else if(logindetails.length>1){
      // setloginDetails(logindetails[0]);
      console.log('x');
      console.log(logindetails);
      const synt=window.speechSynthesis;
    const utterance=new SpeechSynthesisUtterance();
    utterance.text+="Welcome to the Account page.,"
    const info=document.querySelectorAll("h4");
    info.forEach((header) => {
      utterance.text += header.textContent + ", ";
    });
    synt.speak(utterance);
    }
  },[logindetails,user])
  
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
    if(test==="update."){
      navigate("/Account/update");
    }
    else if (test === "go to restaurants.") {
      navigate("/Restaurants/Home");
    } else if (test === "gotoaccount.") {
      navigate("/Account/Home");
    } else if (test === "go to cart.") {
      navigate("/Cart/Home");
    } else if (test === "gotoinstamart.") {
      navigate("/Instamart/Home");
    }
    else{
      navigate("/Account/Signup");
    }
   }
  },[click])
  return (
    <div>
      <button onClick={handleClick}>
          {logindetails.map(item=>{
       
             return(
              <div key={item.id}>
              <h4>UserName:  {item.username}</h4>
              <h4>Address:  {item.address}</h4>
              <h4>Mobile Number:  {item.mobile}</h4>
           </div>
             )
           })
          }
      </button>
    </div>
  )
}

export default Home