import React from 'react'
import { useState } from 'react';
const AddTaskForm = () => {
    const [text, setText] = useState("");

    const speak = () => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
  
      // Retrieve the headers from the HTML document
      const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headers.forEach((header) => {
        utterance.text += header.textContent + " ";
      });
  
      // Retrieve the data from the HTML document
      const dataElements = document.querySelectorAll("[data-read]");
      dataElements.forEach((dataElement) => {
        utterance.text += dataElement.textContent + " ";
      });
  
      synth.speak(utterance);
    };
    const [test,setTest]=useState("");
  
    const handleListen = () => {
      const recognition = new window.webkitSpeechRecognition();
  
      recognition.onstart = () => {
        console.log("Speech recognition listening...");
      };
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTest(transcript);
      };
      recognition.start();
    };
    
    return (
      <>
      <div >
        <h1>Example Website</h1>
        <h2>Header 1</h2> 
        <p data-read>This is some data to be read.</p>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={speak}>Speak</button>
      </div>
      <div>
      <input type="text" value={test} onChange={(e) => setTest(e.target.value)} />
      <h3>{test}</h3>
      <button onDoubleClick={handleListen}>Listen</button>
    </div>
      </>
    );
}

export default AddTaskForm;