import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [cartdata, setCartData] = useState([]);
  const [rdata, setRdata] = useState([]);
  const[totalprice,setTotalprice]=useState(0);
  const [listen,setListen]=useState(false);
  const [userdetails,setUserDetails]=useState([]);
  const [test,settest]=useState("");
  const [address,setAddress]=useState("");
  const [mobile,setMobile]=useState("");
const [username,setUsername]=useState("");
 
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
const [goto,setGoto]=useState(false);
const navigate=useNavigate();
useEffect(()=>{
  if(goto){
     navigate('/Cart/End')
  }
},[goto])
  useEffect(()=>{
    if(test!==""&& address!==""){
      const synt=window.speechSynthesis;
      console.log(address);
      const utterance=new SpeechSynthesisUtterance();
      utterance.text+=("Thank you "+username+"for ordering,")
      utterance.text+="Order placed successfully,";
      utterance.text+=("We are delivering to the address,"+address);
      utterance.text+=(",Our delivery partner will make a call to "+mobile)
      utterance.text+=("Please pay the amount,"+totalprice+",to our delivery partner,");
      utterance.text+=",Have a nice day.";
      synt.speak(utterance);
      setGoto(true);
    }
  },[test])
  useEffect(()=>{
     const fetchData=async()=>{
      try{
        const response=await axios.get(" http://localhost:5000/login_user");
        setUserDetails(response.data);
        console.log(response.data[1].address);
        setAddress(response.data[1].address);
        setMobile(response.data[1].mobile);
        setUsername(response.data[1].username);

      }
      catch(e){
        console.log(e);
      }
     }
     fetchData();
  },[])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/Hyderabaspicedata");
  //       setData(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);
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
        setRdata(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  
  // useEffect(() => {
  //   if (data.length !== 0 && cartdata.length !== 0 && rdata.length === 0) {
  //     const matchedData = [];
  //     for (let i = 0; i < cartdata.length; i++) {
  //       const item = cartdata[i];
  //       const match = data.find(d => d.Id === item.id);
  //       if (match) {
  //         matchedData.push(match);
  //       }
  //     }
  //     setRdata(matchedData);
  //   }
  // }, [data, cartdata, rdata]);
useEffect(()=>{
   if(rdata.length!==0){
    const synt=window.speechSynthesis;
    const utterance=new SpeechSynthesisUtterance();
    utterance.text+="Welcome to the cart page.The items in the cart are,"
    const info=document.querySelectorAll("p");
    info.forEach((header) => {
      utterance.text += header.textContent + ". ";
    });
    synt.speak(utterance);
   }
},[rdata])
  return (
    <>
   <button onClick={handleClick}>
     
   <div>
      {rdata.map(item => (
        <div key={item.Id}>
          <img src={item.Image}/>
          <p>Item-Name:{item.Item_name}</p>
          <p>Price:{item.Price}</p>
          </div>
      ))}
    </div>
    <hr/>
    <hr/>
    <p>Total Price:{totalprice}</p>
   </button>
    </>
  );
};

export default Home;
