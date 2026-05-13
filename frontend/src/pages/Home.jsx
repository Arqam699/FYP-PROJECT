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
            navigate("/signin");
            setUserData(null);
        } catch (error) {
            setUserData(null);
            console.log(error);

        }
    }


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