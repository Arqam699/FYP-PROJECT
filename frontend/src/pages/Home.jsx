import React, { useEffect } from "react";
import { userDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 import { useRef } from "react";

function Home(){
    const { userData,serverUrl,setUserData,getGeminiResponse } = React.useContext(userDataContext);
     const navigate = useNavigate();
    const handleLogout = async() => {
        try {
            const rexult = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            navigate("/signin");
            setUserData(null);
        } catch (error) {
            setUserData(null);
            console.log(error);

        }
    }




useEffect(() => {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    let isProcessing = false;

    const assistantName = userData.assistantname.toLowerCase();

    const startListening = () => {
        try {
            recognition.start();
        } catch (e) {
            console.log("Recognition already started");
        }
    };

    const stopListening = () => {
        try {
            recognition.stop();
        } catch (e) {}
    };

    recognition.onresult = async (e) => {

        if (isProcessing) return;

        const transcript =
            e.results[e.results.length - 1][0].transcript.trim().toLowerCase();

        console.log("heard:", transcript);

        // wake word check
        if (!transcript.includes(assistantName)) return;

        isProcessing = true;

        stopListening();

        // extract command safely
        const command = transcript.split(assistantName)[1]?.trim();

        if (!command) {
            console.log("No command detected");
            isProcessing = false;
            startListening();
            return;
        }

        try {

            console.log("processing command:", command);

            const data = await getGeminiResponse(command);

            console.log("response:", data);

        } catch (err) {
            console.log("API error:", err);
        }

        // cooldown BEFORE restarting (important for RPM control)
        setTimeout(() => {
            isProcessing = false;
            startListening();
        }, 2000);
    };

    recognition.onerror = (e) => {
        console.log("Speech error:", e);
        isProcessing = false;
        startListening();
    };

    recognition.onend = () => {
        if (!isProcessing) {
            startListening();
        }
    };

    startListening();

    return () => stopListening();

}, []);


    return (
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0d0da3] flex flex-col justify-center items-center gap-2 " >
        <button className="w-30 h-10 bg-blue-400  text-black rounded-full text-[18px] font-bold hover:bg-blue-600 hover:text-white tracking-wide transition-all duration-300 cursor-pointer mt-3 absolute right-[40px] top-[30px] hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] active:scale-95"  onClick={handleLogout}>LogOut</button>
           
         <button className="w-53 h-10  bg-blue-400 text-black rounded-full text-[17px] font-bold hover:bg-blue-600 transition-all duration-300 hover:text-white cursor-pointer mt-3 absolute top-[85px] right-[40px] hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] active:scale-95" onClick={()=>navigate("/customize")}>Customize Your Assistant</button>

            <div className="w-[300px] h-[300px] flex flex-col justify-center items-center rounded-4xl overflow-hidden mb-2 ">
                <img src={userData?.assistantimage} alt="Assistant" className="h-full object-cover" />
            </div>
            <div className="mb-10">
             <h1 className="text-white tracking-wider text-[27px]"> I'am {userData?.assistantname}</h1>
            </div>
               <button className="w-30 h-10 bg-blue-400  text-black rounded-full text-[18px] font-bold hover:bg-blue-600 hover:text-white tracking-wide  transition-all duration-300 cursor-pointer mt-3 absolute right-[40px] top-[140px] hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] active:scale-95" onClick={()=>navigate("/instruction")} >Instructions  </button>
        </div>
    );
}
export default Home;