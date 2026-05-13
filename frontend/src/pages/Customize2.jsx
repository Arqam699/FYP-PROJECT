import React, { useContext, useState } from "react";
import { userDataContext } from "../Context/UserContext";
import axios, { Axios } from "axios"
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";


function Customize2(){
    const  {userData,backendImage,selectedImage,serverUrl, setUserData } = useContext(userDataContext)
    const [loading,setLoading] = useState(false)
        const navigate = useNavigate()
    const [assistantName,setAssistantName] = React.useState(userData?.AssistantName || "")
    const handleUpdateAssistant = async ()=>{
         try {
            setLoading(true)
            let formData = new FormData(); 
            formData.append("assistantName",assistantName)
            if(backendImage){
                formData.append("assistantImage",backendImage)
            }
            else{
                formData.append("imageUrl",selectedImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/update`, formData, {
                withCredentials: true,
            })

            console.log(result.data)
          setUserData(result.data)
          navigate("/")

         } catch (error) {
            console.log(error.response?.data)


         } 
    }

    return(
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0d0da3] flex flex-col justify-center items-center gap-3 ">

         <IoArrowBackOutline  className="absolute top-10 left-10 h-8 w-9 text-blue-300 hover:text-white cursor-pointer"
         onClick={()=> {navigate("/customize")}}/>

            <h1 className="text-[35px] text-blue-200   text-center my-4">Enter Your <span className="text-blue-400 text-center">Assistant Name</span></h1>
            
            <input type="text" autoFocus placeholder="Enter Assistant Name" className="w-90 h-10 text-white outline-none border-2 px-5  py-7 mb-4 border-white placeholder:text-white rounded-full text-[15px] transition-all duration-300 hover:shadow-[0_0_10px_rgba(96,165,250,0.6)] focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]" onChange={(e)=> setAssistantName(e.target.value)} value={assistantName} />

         {assistantName &&    <button className="w-52 h-13 bg-blue-400 font-semibold text-black rounded-full text-[19px]  hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] active:scale-95" disabled={loading} onClick={()=> handleUpdateAssistant()}>
            {!loading ? "Create your Assistant" : "Creating Assistant..."}</button>}
        </div>
      )
}
export default Customize2;
