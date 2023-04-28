import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [cartdata, setCartData] = useState([]);
  const [rdata, setRdata] = useState([]);
  const[totalprice,setTotalprice]=useState(0);
  const [listen,setListen]=useState(false);
  const [userdetails,setUserDetails]=useState([]);
  const [test,settest]=useState("");
  const [address,setAddress]=useState("");
 
    const handleClick=()=>{
      
        const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          settest(transcript);
          recognition.stop();
          console.log(test);
        };
        recognition.start();

    }

  useEffect(()=>{
    if(test!==""&& address!==""){
      const synt=window.speechSynthesis;
      console.log(address);
      const utterance=new SpeechSynthesisUtterance();
      utterance.text+="Order placed successfully";
      utterance.text+=("We are delivering to the address"+address);
      synt.speak(utterance);
    }
  },[test])
  useEffect(()=>{
     const fetchData=async()=>{
      try{
        const response=await axios.get(" http://localhost:5000/login_user");
        setUserDetails(response.data);
        console.log(response.data);
        setAddress(userdetails.address);
      }
      catch(e){
        console.log(e);
      }
     }
     fetchData();
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Hyderabaspicedata");
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  useEffect(()=>{
    let x=0;
    if(rdata.length!==0){
        for(let i of rdata){
          x+=i.Price;
        }
    }
    setTotalprice(x);
  },[rdata])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setCartData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (data.length !== 0 && cartdata.length !== 0 && rdata.length === 0) {
      const matchedData = [];
      for (let i = 0; i < cartdata.length; i++) {
        const item = cartdata[i];
        const match = data.find(d => d.Id === item.id);
        if (match) {
          matchedData.push(match);
        }
      }
      setRdata(matchedData);
    }
  }, [data, cartdata, rdata]);
useEffect(()=>{
   if(rdata.length!==0){
    const synt=window.speechSynthesis;
    const utterance=new SpeechSynthesisUtterance();
    const info=document.querySelectorAll("h5","h6");
    info.forEach((header) => {
      utterance.text += header.textContent + ". ";
    });
    synt.speak(utterance);
    setListen(true);
   }
},[rdata])
  return (
    <>
   <button onClick={handleClick}>
     
   <div>
      {rdata.map(item => (
        <div key={item.Id}>
          <img src={item.Image}/>
          <h5>Item-Name:{item.Item_name}</h5>
          <h5>Price:{item.Price}</h5>
          </div>
      ))}
    </div>
    <hr/>
    <hr/>
    <h5>Total Price:{totalprice}</h5>
   </button>
    </>
  );
};

export default Home;
