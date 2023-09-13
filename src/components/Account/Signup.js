import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Signup.css'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [details, setDetails] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(true);
  const [mobile,setMobile]=useState("");
  const [address,setAddress]=useState("");
  const [listening, setListening] = useState(false);
  const [click, setClick] = useState(0);
  const [x,setX]=useState(true);
  const [listen,setListen]=useState(false);
  const [test,setTest]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    if(listen){
      const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTest(transcript);
        recognition.stop();
        console.log(transcript);
      };
      recognition.start();
    };
    if(test!==""){
        navigate("/Account/Login");
    }
  },[listen,test])
  useEffect(()=>{
    if(x){
      const synth=window.speechSynthesis;
      const utterance=new SpeechSynthesisUtterance();
      utterance.text+="Welcome to the signup page."
      synth.speak(utterance);
      setX(false);
    }
  },[x])
  useEffect(() => {
    if (username && click === 1) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Tell your username after clicking mouse";
      synth.speak(utterance);
      setUsername(false);
    }
  }, [username, click]);
  const handleClick=(e)=>{
    e.preventDefault();
   
    setClick(click+1);
    console.log(click);
  }
  useEffect(() => {
    if (click === 3) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Tell your password after clicking mouse";
      synth.speak(utterance);
      setUsername(false);
    }
  }, [username, click]);
  useEffect(() => {
    if (click === 7) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Tell your mobile number after clicking mouse";
      synth.speak(utterance);
      setUsername(false);
    }
  }, [username, click]);
  useEffect(() => {
    if (click === 5) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Tell your Address after clicking mouse";
      synth.speak(utterance);
      setUsername(false);
    }
  }, [username, click]);
  useEffect(() => {
    if (click===2) {
      console.log("Entered the recognition mode");
      const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setId(transcript);
        // setTimeout(() => {
        //   recognition.stop();
        // }, 4000);
        if(transcript==="go to login."){
          navigate("/Account/Login")
        }
        else if(transcript==="gotohelp." || transcript==="help." || transcript==="need help."){
          navigate("/Help")
         }
        console.log(transcript);
        console.log(id);
      };
      recognition.start();
      };
      if (click===4) {
        console.log("Ready to listen password");
        const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setPassword(transcript);
        recognition.stop();
        console.log(transcript);
        if(transcript==="gotohelp." || transcript==="help." || transcript==="need help."){
          navigate("/Help")
         }
      };
      recognition.start();
        };
        if (click===6) {
          console.log("Ready to listen password");
          const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          setAddress(transcript);
          recognition.stop();
          console.log(transcript);
          if(transcript==="gotohelp." || transcript==="help." || transcript==="need help."){
            navigate("/Help")
           }
        };
        recognition.start();
          };
          if (click===8) {
            console.log("Ready to listen password");
            const recognition = new window.webkitSpeechRecognition();
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            setMobile(transcript);
            recognition.stop();
            console.log(transcript);
            if(transcript==="gotohelp." || transcript==="help." || transcript==="need help."){
              navigate("/Help")
             }
          };
          recognition.start();
            };
           
      setListening(false);
    
  }, [listening, click]);
  const [submit,setSubmit]=useState(false);
  // useEffect(()=>{
  //  if(submit){
  //   const synth=window.speechSynthesis;
  //   const utterance=new SpeechSynthesisUtterance();
  //   utterance.text+="Click one more time to submit";
  //   synth.speak(utterance);
  //   setSubmit(false);
  //  }
  // },[submit])
    useEffect(()=>{
    if(click===8){
      setSubmit(true);
    }
    if(click===9){
      if (id !== "" && password !== "") {
        const data = { userid: id, pass: password ,mobno:mobile,add:address};
        let temp = 0;
  
        for (let i of details) {
          if (i.userid === data.userid) {
            console.log("Wrong details");
            temp = 1;
            break;
          }
        }
         
        if (temp === 0) {
          setDetails([...details, data]);
          console.log("Details added:", data);
        }
        const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();

      // Retrieve the headers from the HTML document
      const headers = document.querySelectorAll("h4","h5");
      headers.forEach((header) => {
        utterance.text += header.textContent + " ";
      });
       utterance.text+="Added details successfully";
      synth.speak(utterance);
       
        setId("");
        setPassword("");
      }
    };
    
    },[click]);
   useEffect(()=>{
     if(click===9){
      const createPost=async() =>{
    try {
      const payload={
        id: 3,
        username:id,
        address:address,
        mobile:mobile,
        password:password
      }
      console.log(payload);
      const res = await axios.post(" http://localhost:5000/Users", payload);
      navigate("/Account/Login");
      console.log(res);
     
    } catch (e) {
      console.log(e);
    }
      }
      createPost();
     }
   },[click])
   useEffect(()=>{
    if(click===10){
      setListen(true);
    }
   },[click]);
  return (
    <div>
      <button onClick={handleClick}>
        <h2>SignUp Page</h2>
      <form >
        <label>Username:</label>
        {/* <button onClick={() => setListening(true)}>Speak Username</button> */}
        <input type='text' onChange={(e) => setId(e.target.value)} />

        <label>Password:</label>
        {/* <button onClick={() => setListening(true)}>Speak Password</button> */}
        <input type='password'  onChange={(e) => setPassword(e.target.value)} />
        {/* <input type='phoneno' /> */}
        <label>Mobile No:</label>
        {/* <button onClick={() => setListening(true)}>Speak Password</button> */}
        <input type='Number'  onChange={(e) => setMobile(e.target.value)} />
        <label>Address:</label>
        <textarea type="text" onChange={(e)=>setAddress(e.target.value)}/>
        {/* <button type='submit'>Signup</button> */}
        <h5 className='submit'>Submit</h5>
      </form>
      <hr/>
      {/* <h4>{id}</h4>
      <h5>{password}</h5> */}
      </button>
    </div>
  );
};

export default Signup;
