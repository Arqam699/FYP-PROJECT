import React from "react";
import { userDataContext } from "../Context/UserContext";   

function Card({ image }) {
    const { setSelectedImage,selectedImage,setBackendImage,setFrontendImage } = React.useContext(userDataContext);
    return (
        <div className={`w-[70px] h-[140px]  lg:w-[150px] lg:h-[200px] border-2 border-blue-400 rounded-2xl overflow-hidden mx-2
         hover:shadow-2xl  hover:border-4   hover:scale-110 transition-all duration-300 cursor-pointer  ${selectedImage === image ? "border-4  border-white" : ""}`} onClick={()=>{setSelectedImage(image)
            setBackendImage(null)
            setFrontendImage(null)
         }}>
    <img src={image} className="h-full  object-cover rounded-2xl " />
        </div>
    );
}
export default Card;
