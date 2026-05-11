import React, { useRef, useState } from "react";
import Card from "../Component/Card";
import { LuImagePlus } from "react-icons/lu";

import { IoArrowBackOutline } from "react-icons/io5";
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.png'; 
import image6 from '../assets/image6.jpg';
import imaage7 from '../assets/image7.png';
import { userDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
function Customize(){

    const { serverUrl,userData, setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage}=React.useContext(userDataContext);

    const inputImage = useRef() 
    const navigate = useNavigate()

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file));
    }
    return(
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0d0da3] flex flex-col justify-center items-center ">

   <IoArrowBackOutline  className="absolute top-10 left-10 h-8 w-9 text-blue-300 hover:text-white cursor-pointer"
         onClick={()=> {navigate("/")}}/>

            <h1 className="text-[40px] text-blue-100 text-center my-4">Select you <span className="text-blue-300 text-center">Assistant Image</span></h1>
            <div className="w-[90%] max-w-[70%]  flex flex-wrap justify-center items-center gap-3" >
         <Card image={image1}/>
            <Card image={image2}/>
            <Card image={image3}/>
            <Card image={image4}/>
            <Card image={image5}/>
            <Card image={image6}/>
            <Card image={imaage7}/>
                <div className= {`w-[70px] h-[140px]  lg:w-[150px] lg:h-[200px] border-2 border-blue-400 rounded-2xl overflow-hidden mx-2
         hover:shadow-2x  hover:border-4   hover:scale-110 transition-all duration-300 cursor-pointer flex justify-center items-center ${selectedImage == "input" ? "border-4  border-white" : "" } `} onClick={()=>{inputImage.current.click() 
            setSelectedImage("input")
         }} >
         {!frontendImage && <LuImagePlus className="w-8 h-8 text-white hover:text-blue-300 " />}
         {frontendImage && <img src={frontendImage} className="h-full object-cover" />}
        </div>
        <input type="file" accept="image/*" ref={inputImage} hidden onChange={handleImage} />
            </div>
        {selectedImage  && <button className="w-30 h-16 bg-blue-400 font-bold text-black rounded-full text-[20px] font-bold hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer my-5 "   onClick={() => {navigate("/customize2")}}>
            Next
          </button>}
        </div>
    )
}
export default Customize;