import React from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import { IoArrowBackOutline } from "react-icons/io5";
import { p } from "framer-motion/client";

function Instruction() {
    const navigate = useNavigate();

    const { userData } =
        React.useContext(
            userDataContext
        );

    const assistantName =
        userData?.assistantname ||
        "Assistant";

    const commands = [
        {
            title: "Open Applications & Websites",
            description:
                "Use the keyword 'open' to launch desktop applications or websites. If the desktop application is installed on your computer, the assistant will open the desktop application directly. If the application is not installed, then the assistant will automatically open the website version in your browser.",
            items: [
                `${assistantName} open chrome`,
                `${assistantName} open youtube`,
                `${assistantName} open spotify`,
                `${assistantName} open whatsapp`,
                `${assistantName} open vscode`,
                `${assistantName} open netflix`,
                `${assistantName} open notepad`,
                `${assistantName} open calculator`,
                `${assistantName} open paint`,
                `${assistantName} open explorer`,
                `${assistantName} open camera`,
                `${assistantName} open vlc`,
                `${assistantName} open word`,
                `${assistantName} open excel`,
                `${assistantName} open powerpoint`,
                `${assistantName} open music`,
                `${assistantName} open photos`,
                `${assistantName} open taskmanager`,
                `${assistantName} open controlpanel`,
                `${assistantName} open settings`,
                `${assistantName} open downloads`,
                `${assistantName} open documents`,
                `${assistantName} open desktop`,
                `${assistantName} open recyclebin`,
                `${assistantName} open terminal`
            ]
        },
        {
            title: "Close Running Applications",
            description:
                "Use the keyword 'close' to close currently running applications on your PC.",
            items: [
                `${assistantName} close chrome`,
                `${assistantName} close whatsapp`,
                `${assistantName} close spotify`,
                `${assistantName} close vscode`,
                `${assistantName} close linkedin`,
                `${assistantName} close netflix`,
                `${assistantName} close notepad`,
                `${assistantName} close calculator`,
                `${assistantName} close paint`,
                `${assistantName} close camera`,
                `${assistantName} close vlc`,
                `${assistantName} close word`,
                `${assistantName} close excel`,
                `${assistantName} close powerpoint`,
                `${assistantName} close photos`,
                `${assistantName} close taskmanager`,
                `${assistantName} close controlpanel`,
                `${assistantName} close settings`,
                `${assistantName} close downloads`,
                `${assistantName} close documents`,
                `${assistantName} close desktop`,
                `${assistantName} close recyclebin`,
                `${assistantName} close androidstudio`,
                `${assistantName} close zoom`,
                `${assistantName} close skype`,
                `${assistantName} close terminal`,
            ]
        },
        {
            title: "Close Specific Tab",
            description: "Use the keyword 'close' together with 'tab' to close a specific browser tab. Example: `${assistantName} close youtube tab` will close the YouTube tab.",
            items: [
                `${assistantName} close youtube tab`,
                `${assistantName} close facebook tab`,
                `${assistantName} close gmail tab`,
                `${assistantName} close twitter tab`
            ]
        },
        {
            title: "Google Search",
            description:
                "Use the keyword 'search' to search anything directly on Google.",
            items: [
                `${assistantName} search artificial intelligence`,
                `${assistantName} search latest technology news`,
                `${assistantName} search javascript tutorial`,
                `${assistantName} search weather today`
            ]
        },
        {
            title: "YouTube Search",
            description:
                "Use the keyword 'youtube search' to search videos directly on YouTube.",
            items: [
                `${assistantName} youtube search coding tutorials`,
                `${assistantName} youtube search songs`,
                `${assistantName} youtube search cricket highlights`,
                `${assistantName} youtube search react js`
            ]
        },
        {
            title: "Google Maps",
            description:
                "Use the keyword 'map' to search locations and open Google Maps.",
            items: [
                `${assistantName} map lahore`,
                `${assistantName} map university of lahore`,
                `${assistantName} map islamabad`,
                `${assistantName} map nearest restaurant`
            ]
        },
        {
            title: "Weather Information",
            description:
                "Use the keyword 'weather' to check weather updates of any city.",
            items: [
                `${assistantName} weather`,
                `${assistantName} weather in lahore`,
                `${assistantName} weather in karachi`,
                `${assistantName} weather in islamabad`
            ]
        },
        {
            title: "Music & Entertainment",
            description:
                "Use music related commands to play songs or open entertainment platforms.",
            items: [
                `${assistantName} play music`,
                `${assistantName} play song`,
                `${assistantName} open youtube`,
                `${assistantName} open spotify`
            ]
        },
        {
            title: "Volume Controls",
            description:
                "Control your PC volume using voice commands that start with your assistant name. For example, `${assistantName} set volume 50`,`${assistantName} mute`, `${assistantName} unmute`.",
            items: [
                `${assistantName} mute`,
                `${assistantName} unmute`,
                `${assistantName} set volume 50`,
            ]
        },
        {
            title: "System Controls",
            description:
                "Control key PC system functions: 'shutdown pc' 'restart pc' and 'lock screen'",
            items: [
                `${assistantName} shutdown pc`,
                `${assistantName} restart pc`,
                `${assistantName} lock screen`
            ]
        },
        {
            title: "AI Assistant Features",
            description:
                "You can communicate with the assistant in English, Urdu. Ask questions, get explanations,weather information, and general AI responses.",
            items: [
                `${assistantName} who are you`,
                `${assistantName} can you help me`,
                `${assistantName} tell me about javascript`,
                `${assistantName} what is artificial intelligence`,
                // URDU
                `${assistantName} tum kon ho`,
                `${assistantName} mujhe javascript samjhao`,
                `${assistantName} react kya hai`,
            ]
        }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-black to-[#1b1b21] text-white px-6 py-10 relative">
            {/* BACK BUTTON */}
            <IoArrowBackOutline
                className="absolute top-10 left-10 h-8 w-9 text-blue-300 hover:text-white cursor-pointer transition-all duration-300"
                onClick={() => {
                    navigate("/");
                }}
            />

            {/* HEADING  */}
            <div className="w-full flex justify-center items-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-center">
                    Assistant Instructions
                </h1>
            </div>

            {/* INTRO  */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 backdrop-blur-md shadow-xl">
                <h2 className="text-3xl font-bold mb-3 text-cyan-300">
                    How To Use
                </h2>
                <p className="text-gray-200 leading-8 text-lg">
                    Start every command using your assistant name.
                    <br /><br />
                    Example:
                    <span className="text-cyan-300 font-bold">
                        {" "}{assistantName} open youtube
                    </span>
                    <br /><br />
                    Speak clearly and wait for the assistant response before giving another command.
                    <br /><br />
                    Different keywords perform different actions:
                    <br /><br />
                    <span className="text-cyan-300 font-bold">open</span>
                    {" "}→ Opens desktop applications or websites.
                    <br /><br />
                    If the desktop application is installed on your computer,
                    the assistant will open the desktop application directly.
                    <br /><br />
                    If the application is not installed,
                    then the assistant will automatically open its website version in your browser.
                    <br /><br />
                    Example:
                    <br /><br />
                    <span className="text-cyan-300 font-bold">{assistantName} open spotify</span>
                    <br /><br />
                    → If Spotify desktop app exists, it will open the app.
                    <br /><br />
                    → Otherwise, Spotify website will open automatically.
                    <br /><br />
                    <span className="text-cyan-300 font-bold">close</span>
                    {" "}→ Closes running applications.
                    <br /><br />
                    <span className="text-cyan-300 font-bold">search</span>
                    {" "}→ Searches on Google.
                    <br /><br />
                    <span className="text-cyan-300 font-bold">youtube search</span>
                    {" "}→ Searches videos on YouTube.
                    <br /><br />
                    <span className="text-cyan-300 font-bold">map</span>
                    {" "}→ Opens Google Maps locations.
                    <br /><br />
                    <span className="text-cyan-300 font-bold">weather</span>
                    {" "}→ Shows weather information.
                    <br /><br />
                    <span className="text-cyan-300 font-bold">volume up / volume down</span>
                    {" "}→ Controls system volume.
                    <br /><br />
                    <span className="text-cyan-300 font-bold">shutdown pc / restart pc</span>
                    {" "}→ Controls your computer system.
                    <br /><br />
                    You can also ask normal AI questions for help, coding, explanations, and information.
                </p>
            </div>

            {/* COMMANDS  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    commands.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {/* TITLE */}
                            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                                {section.title}
                            </h2>
                            {/* DESCRIPTION */}
                            <p className="text-gray-300 leading-7 mb-5">
                                {section.description}
                            </p>
                            {/* COMMANDS */}
                            <div className="flex flex-col gap-3">
                                {
                                    section.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="bg-black/30 px-4 py-3 rounded-xl text-gray-200 hover:bg-blue-500/20 transition-all duration-300 border border-white/10"
                                        >
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Instruction;
