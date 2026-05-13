import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function Instruction(){
        const navigate = useNavigate();
    return (
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0d0da3] flex flex-col justify-center items-center gap-2 " >

            <h1 className="text-white tracking-wider text-[27px]">Instructions</h1>
            <p className="text-white text-[18px] w-[80%] max-w-[600px] text-center">Welcome to the Virtual Assistant! To get started, simply customize your assistant by selecting an image and giving it a name. Once you're done, you can interact with your assistant and ask it anything you'd like. Whether you need help with tasks, information, or just want to have a conversation, your virtual assistant is here to assist you. Enjoy exploring its capabilities and have fun chatting!</p>

               <IoArrowBackOutline  className="absolute top-10 left-10 h-8 w-9 text-blue-300 hover:text-white cursor-pointer"
                     onClick={()=> {navigate("/")}}/>
        </div>
    );
}
export default Instruction;