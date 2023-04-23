import React, { useState, useEffect } from 'react';

const Home = () => {
  const [details, setDetails] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(true);
  const [listening, setListening] = useState(false);
  const [click, setClick] = useState(0);

  useEffect(() => {
    if (username && click === 0) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Tell your username";
      synth.speak(utterance);
      setUsername(false);
    }
  }, [username, click]);

  useEffect(() => {
    if (username && click === 1) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Tell your password";
      synth.speak(utterance);
      setUsername(false);
    }
  }, [username, click]);

  useEffect(() => {
    if (listening) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (click === 0) {
          setId(transcript);
          setClick(1);
          setListening(false);
        } else {
          setPassword(transcript);
          setClick(0);
          setListening(false);
        }
      };
      recognition.start();
      setListening(false);
    }
  }, [listening, click]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id !== "" && password !== "") {
      const data = { userid: id, pass: password };
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

      setId("");
      setPassword("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <button onClick={() => setListening(true)}>Speak Username</button>
        <input type='text' value={id} onChange={(e) => setId(e.target.value)} />

        <label>Password:</label>
        <button onClick={() => setListening(true)}>Speak Password</button>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>LOGIN</button>
      </form>
    </div>
  );
};

export default Home;
