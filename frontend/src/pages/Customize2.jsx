import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios, { Axios } from "axios";


function Customize2(){
    const  {userData,backendImage,selectedImage,serverUrl, setUserData } = useContext(userDataContext)
    const [assistantName,setAssistantName] = React.useState(userData?.AssistantName || "")
    const handleUpdateAssistant = async ()=>{
         try {
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

         } catch (error) {
            console.log(error.response?.data)


         } 
    }

    return(
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0d0da3] flex flex-col justify-center items-center gap-3 ">
            <h1 className="text-[35px] text-blue-200   text-center my-4">Enter Your <span className="text-blue-400 text-center">Assistant Name</span></h1>
            
            <input type="text" placeholder="Enter Assistant Name" className="w-90 h-10 text-white outline-none border-2 px-5 py-7 mb-4 border-white placeholder:text-cyan-100 rounded-full text-[15px]" onChange={(e)=> setAssistantName(e.target.value)} value={assistantName} />

         {assistantName &&    <button className="w-52 h-13 bg-blue-400 font-semibold text-black rounded-full text-[19px]  hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer" onClick={()=> handleUpdateAssistant()}>Create Your Assistant</button>}
        </div>
      )
}
export default Customize2;
