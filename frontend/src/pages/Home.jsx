import React from "react";
import { userDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home(){
    const { userData,serverUrl,setUserData } = React.useContext(userDataContext);
     const navigate = useNavigate();
    const handleLogout = async() => {
        try {
            const rexult = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            setUserData(null);
            navigate("/signin")
        } catch (error) {
            setUserData(null);
            console.log(error);
            
        }
      }


    return (
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0d0da3] flex flex-col justify-center items-center gap-2 " >
        <button className="w-30 h-10 bg-blue-400 text-white rounded-full text-[16px] font-bold hover:bg-blue-600 transition duration-300 cursor-pointer mt-3 absolute right-[40px] top-[30px]" onClick={handleLogout}>LogOut</button>
           
         <button className="w-52 h-10 bg-blue-400 text-white rounded-full text-[16px] font-bold hover:bg-blue-600 transition duration-300 cursor-pointer mt-3 absolute top-[85px] right-[40px]" onClick={()=>navigate("/customize")}>Customize Your Assistant</button>

            <div className="w-[300px] h-[300px] flex flex-col justify-center items-center rounded-4xl overflow-hidden mb-2 border-2 border-blue-300 ">
                <img src={userData?.assistantimage} alt="Assistant" className="h-full object-cover" />
            </div>
            <div className="mb-10">
             <h1 className="text-white text-[22px]"> I'm {userData?.assistantname}</h1>
            </div>
        </div>
    );
}
export default Home;