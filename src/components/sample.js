const [read,setRead]=useState(true);
    const reading=()=>{
            if(read){
                const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance();

            // Retrieve the headers from the HTML document
            const headers = document.querySelectorAll("li");
            headers.forEach((header) => {
                utterance.text += header.textContent + " ";
            });

            synth.speak(utterance);
            setRead(false);
            }
    }
    const [test,setTest]=useState("");
    const [listening,setListening]=useState(true);
    const [goto,setGoto]=useState(false);
    const listen=()=>{
            if(listening){
                const recognition = new window.webkitSpeechRecognition();
                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setTest(transcript);
                };
                recognition.start();
                console.log(test);
                setListening(false);
            }
    }
    const Goto=()=>{
        if(goto){
            if (temp === "restaurants") {
                navigate("/Restaurants/Home.js");
            } else if (temp === "account") {
                navigate("/Account/Home.js");
            } else if (temp === "cart") {
                navigate("/Cart/Home.js");
            } else if (temp === "instamart") {
                navigate("/Instamart/Home.js");
            }
        }
    }