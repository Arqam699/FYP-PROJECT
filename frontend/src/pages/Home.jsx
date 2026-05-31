import React, {useEffect,useRef,useState} from "react";
import { userDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {

    const {userData,serverUrl,setUserData,getGeminiResponse} = React.useContext(userDataContext);
    const navigate = useNavigate();

    // STATES

    const [messages, setMessages] =useState([]);

     const [assistantStatus, setAssistantStatus] =useState("listening");

    // REFS

    const recognitionRef = useRef(null);

    const isSpeakingRef =useRef(false);

    const isRecognitionRunningRef =useRef(false);

    const autoRestartRef =useRef(null);

    const isManuallyStoppedRef = useRef(false);

    const chatEndRef = useRef(null);

    // AUTO SCROLL

    useEffect(() => {

        if (chatEndRef.current) {

            chatEndRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }

    }, [messages]);

    // LOGOUT

    const handleLogout = async () => {

        try {

            await axios.get(`${serverUrl}/api/auth/logout`,
                {
                    withCredentials: true
                }
            );

            setUserData(null);

            navigate("/signin");

        } 
        catch (error) {

            console.log(error);

            setUserData(null);
        }
    };

    // OPEN DESKTOP APP

    const openDesktopApp = async (app) => {

        try {

            const result = await axios.post(`${serverUrl}/api/user/open-app`,{app},
                { withCredentials: true }
            );

            const data = result.data;

            if (
                data.type === "web" &&
                data.url
            ) {

                window.open(
                    data.url,
                    "_blank"
                );
            }

        } 
        catch (error) {

            console.log(error);
        }
    };

    // START RECOGNITION

    const startRecognition = () => {

        try {

            if (
                recognitionRef.current &&!isRecognitionRunningRef.current &&
                !isSpeakingRef.current
            ) {

                console.log(
                    "Starting Recognition..."
                );

                recognitionRef.current.start();
            }

        } 
        catch (error) {

            console.log(
                "Start Error:",
                error
            );

            setTimeout(() => {

                startRecognition();

            }, 1000);
        }
    };

    // SPEAK FUNCTION

    const speak = (text) => {

        if (!text) return;

        // SHOW ASSISTANT MESSAGE
        setMessages((prev) => [
            ...prev,
            {
                sender: "assistant",
                text
            }
        ]);

        isSpeakingRef.current = true;
        setAssistantStatus(
    "speaking"
);
        window.speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(
                text
            );

        utterance.lang = "en-US";

        utterance.rate = 1;

        utterance.pitch = 1;

        utterance.onend = () => {


            isSpeakingRef.current = false;
            setAssistantStatus(
    "listening"
);

            setTimeout(() => {

                startRecognition();

            }, 200);
        };

        window.speechSynthesis.speak(
            utterance
        );
    };

    // HANDLE GEMINI COMMANDS

    const handleCommand = (data) => {

        if (!data) return;

        const { type,userInput,response} = data;

        if (response) {
            speak(response);
        }

        switch (type) {
            case "google_search":
                window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
                    "_blank"
                );
                break;

            case "youtube_search":
                window.open(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
                    "_blank"
                );
                break;

            default:
                break;
        }
    };

     // VOICE RECOGNITION

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            console.log(
                "Speech Recognition Not Supported"
            );

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognitionRef.current =
            recognition;

        recognition.continuous = false;

        recognition.interimResults = false;

        recognition.lang = "en-US";

        recognition.maxAlternatives = 1;

        // ON START

        recognition.onstart = () => {
            setAssistantStatus(
    "listening"
);

            isRecognitionRunningRef.current =
                true;
        };

     // ON RESULT
    
        recognition.onresult =
            async (e) => {

                if (
                    isSpeakingRef.current
                ) return;

                const result = e.results[ e.results.length - 1];
                if (!result.isFinal)
                    return;

                const transcript =result[0].transcript.trim().toLowerCase();

                // SHOW EVERY USER MESSAGE

         setMessages((prev) => [

    ...prev,

    {
        sender: "user",
        text: transcript
    }
]);
                const assistantName =
                    userData?.assistantname?.toLowerCase();

                if (!assistantName)
                    return;

                if (
                    !transcript.startsWith(
                        assistantName
                    )
                ) {
                    return;
                }

                const command = transcript.replace(assistantName,"").trim();

             // OPEN YOUTUBE
            
                if (
                    command ===
                    "open youtube"
                ) {
                    speak(
                        "Opening YouTube"
                    );
                    window.open(
                        "https://www.youtube.com",
                        "_blank"
                    );
                    return;
                }

                 // PLAY MUSIC
                 
                if (
                    command === "play music" || command === "play song"
                ) {

                    speak(
                        "Playing Music"
                    );
                    window.open(
                        "https://music.youtube.com",
                        "_blank"
                    );

                    return;
                }

                // WEATHER
                
                if (
                    command.includes("weather")
                ) {
                    let location = "";

                    if (
                        command.includes(
                            "weather in"
                        )
                    ) {
                        location = command.split("weather in")[1] .trim();
                    }
                    else {
                        location = command.replace("weather","").trim();
                    }
                    speak(
                        `Showing weather of ${location}`
                    );
                    window.open(
                        `https://www.google.com/search?q=weather+in+${encodeURIComponent(location)}`,
                        "_blank"
                    );

                    return;
                }

                // GOOGLE SEARCH
                
                if (
                    command.startsWith("search ")
                ) {
                    const query =command.replace("search","");
                    speak(
                        `Searching ${query}`
                    );

                    window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
                        "_blank"
                    );

                    return;
                }

                // YOUTUBE SEARCH
                
                if (
                    command.startsWith("youtube search")
                ) {

                    const query = command.replace("youtube search","");
                    speak(`Searching ${query} on YouTube` );

                    window.open(
                        `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
                        "_blank"
                    );

                    return;
                }

                // MAP SEARCH
                
                if (
                    command.startsWith("map")
                ) {

                    const place = command.replace("map","");
                    speak(
                        `Opening map for ${place}`
                    );
                    window.open(
                        `https://www.google.com/maps/search/${encodeURIComponent(place)}`,
                        "_blank"
                    );

                    return;
                }

                 // OPEN APP
    
                if (
                    command.startsWith("open")
                ) {

                    const app = command.replace("open","").trim();
                    speak(
                        `Opening ${app}`
                    );
                    openDesktopApp(app);
                    return;
            }
                // CLOSE SPECIFIC TAB

                if (
                command.includes(
                "close"
                ) &&
                command.includes(
                "tab"
                    )
                ) {

                const tabName = command.replace("close","").replace("tab","").trim();

                speak(
                `Closing ${tabName} tab`
                     );

            await axios.post(`${serverUrl}/api/user/system`,
    {
        action:
            "close_specific_tab",
        tabName
    },
    {
        withCredentials: true
    }
    );
         return;
            }

       // CLOSE APP
      if (command.startsWith("close")) 
        {
    const app =  command.replace("close","").trim();
    speak(
        `Closing ${app}`
    );
    await axios.post(`${serverUrl}/api/user/system`,
        {
            action: "close_app",
            app
        },
        {
            withCredentials: true
        }
    );

    return;
}
         // MUTE

        if (command ==="mute") {

            speak("Muting system");

            await axios.post(`${serverUrl}/api/user/system`,
    {
        action: "mute"
    },
    {
        withCredentials: true
    }
    );

    return;
}


    // UNMUTE

     if (command ==="unmute") {

   speak(
        "Unmuting system"
      );

      await axios.post(`${serverUrl}/api/user/system`,
    {
        action:
            "unmute"
    },
    {
        withCredentials: true
    }
   );

    return;
    }

// SET VOLUME

      if (command.includes("set volume")
      ) {

     const number = command.match(/\d+/);
    if (number) {
        const volume =parseInt(number[0]);
        speak(
            `Setting volume to ${volume} percent`
        );

        await axios.post(`${serverUrl}/api/user/system`, {
                action:
                    "set_volume",
                volume
            },
            {
                withCredentials: true
            }
        );

        return;
    }
}
                // GEMINI AI

                try { 
                    const data = await getGeminiResponse(command);
                    handleCommand(data);
                } 
                catch (error) {
                    console.log(error);
                    speak(
                        "Something went wrong"
                    );
                }
            };

          // ON ERROR

        recognition.onerror = (
            event
        ) => {

            console.log("Recognition Error:",event.error);
            isRecognitionRunningRef.current =false;
            if (
                !isSpeakingRef.current
            ) {

                setTimeout(() => {

                    startRecognition();

                }, 500);
            }
        };

        // ON END

        recognition.onend = () => {

            isRecognitionRunningRef.current = false;
            if (
                !isSpeakingRef.current &&
                !isManuallyStoppedRef.current
            ) {

                setTimeout(() => {

                    startRecognition();
                }, 300);
            }
        };

        // HEALTH CHECKER

        autoRestartRef.current =
            setInterval(() => {
                if (
                    !isRecognitionRunningRef.current &&
                    !isSpeakingRef.current
                ) {
                    startRecognition();
                }

            }, 5000);

        // INITIAL START
        startRecognition();

        // CLEANUP
        return () => {

            isManuallyStoppedRef.current = true;
            try {
                recognition.stop();
            }  
            catch (error) {

                console.log(error);
            }

            if (
                autoRestartRef.current
            ) {
                clearInterval(
                    autoRestartRef.current
                );
            }
            window.speechSynthesis.cancel();
        };

    }, [userData]);

  return (

<div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#0d0da3] flex flex-col justify-center items-center relative overflow-hidden px-4">

     {/* TOP BUTTONS  */}

    <div className="absolute top-6 right-6 flex flex-col gap-4 z-50">

        <button
            className="w-40 h-11 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-white rounded-2xl text-[16px] font-semibold hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            onClick={handleLogout}
        >
            Logout
        </button>

        <button
            className="w-40 h-11 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-white rounded-2xl text-[16px] font-semibold hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            onClick={() => navigate("/customize")}
        >
            Customize Assistant 
        </button>

        <button
            className="w-40 h-11 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-white rounded-2xl text-[16px] font-semibold hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            onClick={() => navigate("/instruction")}
        >
            Instructions
        </button>

           <button
            className="w-40 h-11 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-white rounded-2xl text-[16px] font-semibold hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            onClick={() => navigate("/contact")}
        >
            Contact Us
        </button>


    </div>

    {/* ASSISTANT IMAGE */}

    <div className="relative mb-6">

        <div className="absolute  rounded-full bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>

        <div className="w-[300px] h-[210px] rounded-4xl overflow-hidden border-3 border-blue-300/40 shadow-[0_0_40px_rgba(59,130,246,0.5)] relative">

            <img
                src={userData?.assistantimage} alt="Assistant"
                className="w-full h-full object-cover"
            />

        </div>

    </div>

    {/* ASSISTANT NAME */}

    <h1 className="text-white text-[32px] md:text-[38px] font-bold tracking-wider mb-5 drop-shadow-lg">
       I'am {" "}
        <span className="text-blue-300">
            {userData?.assistantname}
        </span>

    </h1>

    {/* CHAT BOX */}

 <div className="w-[60%] max-w-[850px] h-[200px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 overflow-y-auto shadow-2xl">

        {
            messages.map(
                (msg, index) => (

                    <div
                     key={index}className={`w-full flex mb-2 ${msg.sender === "user"? "justify-end": "justify-start"}`} >

                        <div
                            className={`max-w-[70%] px-5 py-4 rounded-3xl shadow-lg transition-all duration-300 ${msg.sender === "user"? "bg-blue-700 text-white rounded-br-md": "bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-bl-md"}`} >

                            <p className="text-xs opacity-70 mb-1 tracking-wide">

                     {
                            msg.sender === "user"? "YOU": userData?.assistantname?.toUpperCase()
                    }
                            </p>
                            <p className="text-[15px] leading-4 ">
                                 {msg.text}
                            </p>
                        </div>
                    </div>
                )
            )
        }
        <div ref={chatEndRef}></div>
    </div>

    {/* LISTENING STATUS */}

    <div className="mt-6 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg">
    <div
        className={`w-3 h-3 rounded-full animate-pulse ${assistantStatus === "speaking"? "bg-yellow-400": "bg-green-400"}`}>
        </div>

    <p className="text-gray-200 tracking-wide text-[15px] font-medium">

        {
            assistantStatus === "speaking"? "Assistant is speaking, please wait...": "Assistant is listening..."
        }

    </p>

</div>

</div>
);

}
export default Home;