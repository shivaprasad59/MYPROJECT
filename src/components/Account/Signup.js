import React, { useState, useEffect } from 'react';

const Signup = () => {
  const [details, setDetails] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(true);
  const [mobile,setMobile]=useState("");
  const [address,setAddress]=useState("");
  const [listening, setListening] = useState(false);
  const [click, setClick] = useState(0);

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
        recognition.stop();
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
        console.log(password);
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
          console.log(password);
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
            console.log(mobile);
          };
          recognition.start();
            };
           
      setListening(false);
    
  }, [listening, click]);

  
    useEffect(()=>{
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

  return (
    <div>
      <button onClick={handleClick}>
      <form >
        <label>Username:</label>
        {/* <button onClick={() => setListening(true)}>Speak Username</button> */}
        <input type='text' onChange={(e) => setId(e.target.value)} />

        <label>Password:</label>
        {/* <button onClick={() => setListening(true)}>Speak Password</button> */}
        <input type='password'  onChange={(e) => setPassword(e.target.value)} />
        <input type='phoneno' />
        <button type='submit'>Signup</button>
      </form>
      <hr/>
      {/* <h4>{id}</h4>
      <h5>{password}</h5> */}
      </button>
    </div>
  );
};

export default Signup;
