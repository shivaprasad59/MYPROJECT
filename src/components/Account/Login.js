import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [logindetails,setLoginDetails]=useState([]);
  const [x,setX]=useState(true);
  const navigate=useNavigate();
  useEffect(()=>{
    if(x){
      const synth=window.speechSynthesis;
    const utterance=new SpeechSynthesisUtterance();
    utterance.text+="Welcome to the Login page.Follow instructions to Login";
    utterance.text+="Click and give input every time";
    synth.speak(utterance);
    setX(false);
    }
  },[x])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setLoginDetails(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const [details, setDetails] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(true);
  const [listening, setListening] = useState(false);
  const [click, setClick] = useState(0);
  
  useEffect(() => {
    if ((click%6) === 1) {
      //  console.log(logindetails);
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Tell your username after clicking mouse";
      synth.speak(utterance);
      setUsername(false);
    }
  }, [click]);
  const handleClick=(e)=>{
    e.preventDefault();
   
    setClick(click+1);
    console.log(click);
  }
  useEffect(() => {
  if ((click%6) === 3) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Tell your password after clicking mouse";
      synth.speak(utterance);
      setUsername(false);
    }
  }, [username, click]);

  useEffect(() => {
    if ((click%6)===2) {
      console.log("Entered the recognition mode");
      const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setId(transcript);
        recognition.stop();
        console.log(id);
      };
      recognition.start();
      };
      if ((click%6)===4) {
        console.log("Ready to listen password");
        const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setPassword(transcript);
        recognition.stop();
        console.log(password);
        setClick(click+1);
      };
      recognition.start();
        };
     
      setListening(false);
    
  }, [listening, click]);

  
    useEffect(()=>{
    if((click%6)===5){
      if (id !== "" && password !== "") {
        const data = { userid: id, pass: password };
        let temp = 0;
  
        for (let i of logindetails) {
          console.log("login="+logindetails);
          if ((i.userid === data.userid) && (i.pass===data.password)) {
            console.log("correct details");
            const synth=window.speechSynthesis;
            const utterance=new SpeechSynthesisUtterance();
            utterance.text+="Congratulations.You have entered correct details.Please wait,We are logging you in.";
            synth.speak(utterance);
            temp = 1;
            setDetails([...details, data]);
            break;
          }
        }
       
        if (temp === 0) {
          
          console.log("wrong Details :", data);
          const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();

      // Retrieve the headers from the HTML document
      const headers = document.querySelectorAll("h4","h5");
      headers.forEach((header) => {
        utterance.text += header.textContent + " ";
      });
       utterance.text+="Details are not matched.If not signed up.Yet. First signup please";
      synth.speak(utterance);
      navigate("/Account/Signup");
        }
        
        setId("");
        setPassword("");
      }
    };
    
    },[click]);

  return (
    <div>
      <button onClick={handleClick}>
        <h2>Login Page</h2>
      <form >
        <label>Username:  </label>
        {/* <button onClick={() => setListening(true)}>Speak Username</button> */}
        <input type='text' onChange={(e) => setId(e.target.value)} />

        <label>Password :  </label>
        {/* <button onClick={() => setListening(true)}>Speak Password</button> */}
        <input type='password'  onChange={(e) => setPassword(e.target.value)} />

        <h6>Submit</h6>
      </form>
      <hr/>
      {/* <h4>{id}</h4>
      <h5>{password}</h5> */}
      </button>
    </div>
  );
};

export default Login;
