import React, { useState, useEffect } from 'react';

function App() {
  const [recognition, setRecognition] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState('');
  const [linksText, setLinksText] = useState('');
  
  useEffect(() => {
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      window.speechSynthesis.speak(utterance);
    };
  
    const navigateToPage = async (pageName) => {
      const pageUrl = `${window.location.origin}/components/${pageName}.html`;
  
      if (await pageExists(pageUrl)) {
        window.location.href = pageUrl;
      } else {
        speak('Not recognized. Speak again.');
      }
    };
  
    const pageExists = async (url) => {
      const response = await fetch(url, { method: 'HEAD' });
      return response.status !== 404;
    };
  
    const links = document.querySelectorAll('header ul li a');
    let linksText = '';
    for (let i = 0; i < links.length; i++) {
      linksText += links[i].textContent + ', ';
    }
    setLinksText(linksText);
    speak('Welcome to Swiggy.');
    speak('This page has');
    speak(linksText);
    speak('Click anywhere on the website to give voice input.');
  
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      setRecognition(recognition);
  
      recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setRecognitionResult(transcript);
        console.log(transcript);
        switch (transcript) {
          case 'go to home.':
            navigateToPage('Main/main');
            break;
          case 'go to search.':
            navigateToPage('search');
            break;
          case 'go to offers.':
            navigateToPage('offers');
            break;
          case 'go to insta mart.':
            navigateToPage('instamart/instamart');
            break;
          case 'go to account.':
            navigateToPage('account');
            break;
          case 'go to cart.':
            navigateToPage('cart');
            break;
          default:
            speak('Invalid command. Can you speak again?');
            navigateToPage('home');
        }
      });
  
      recognition.addEventListener('end', () => {
        recognition.start();
      });
    } else {
      console.log('Speech recognition not available');
    }
  
    fetch('footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      });
  }, []);

  return (
    <div>
      <div id="recognition-result">{recognitionResult}</div>
      <button id="start-recognition" onClick={() => recognition.start()}>Start Recognition</button>
    </div>
  );
}

export default App;
