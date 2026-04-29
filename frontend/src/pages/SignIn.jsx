import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import image1 from '../assets/pics/image1.png';
import image2 from '../assets/pics/image2.jpg';
import image3 from '../assets/pics/image3.jpg';
import image4 from '../assets/pics/image4.jpg';
import image5 from '../assets/pics/image5.png';
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";
function login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const[loading,setLoading] = React.useState(false)
const [err,setErr] = React.useState("")

  const {serverUrl,userData, setUserData} = React.useContext(userDataContext)
  const [email,setEmail]  = React.useState("");
  const [password,setPassword]  = React.useState(""); 

 const handlelogin= async(e)=>{
  e.preventDefault();
  setErr("")
  setLoading(true)
    try {
      let result =await axios.post(`${serverUrl}/api/auth/login`,{email,password},{withCredentials:true})
      setUserData(result.data)
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      setUserData(null)
      setErr(error.response.data.message)
      setLoading(false)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-cover flex items-center justify-center' style={{backgroundImage:`url(${image1})`}}>
      <form className='w-[80%] h-120 max-w-[450px] bg-[#0000002f] backdrop-blur
      shadow-lg drop-shadow-blue-950 flex justify-center items-center flex-col gap-5 'onSubmit={handlelogin}>
      <h1 className="text-blue-200 text-[30px] font-bold m-8" >Sign In to <span className="text-blue-300">Virual</span> <span className="text-blue-400">Assistant</span> </h1>
     <input type="text" placeholder="Enter your Email" className="w-88 h-12 outline-none border-2 
      px-7 py-5 border-white bg-transparent placeholder:text-cyan-100 rounded-full text-[16px] m-1 text-blue-100" required onChange={(e)=>setEmail(e.target.value )} value={email} />
    
    <div className="relative">
  <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-88 h-12 rounded-full text-blue-100 border-2 outline-none placeholder:text-cyan-100 px-7 pr-12 py-5" required onChange={(e)=>setPassword(e.target.value )} value={password} />
  {showPassword?(
  < IoMdEyeOff className="absolute top-3 right-5 w-6 h-6 cursor-pointer text-blue-200" onClick={togglePasswordVisibility  } />
    ):(
    <FaEye className="absolute top-3 right-5 w-6 h-6 cursor-pointer text-blue-200" onClick={togglePasswordVisibility} />
    )}
</div>
{err && err.length>0 && <p className="text-red-500 text-3">{err}</p>}
       <button className="w-40 h-10 bg-blue-400 text-white rounded-full text-[16px] font-bold hover:bg-blue-600 transition duration-300 cursor-pointer mt-3" disabled={loading}>
         {loading ? "Signing In..." : "Sign In"}
         </button>

        <p className="text-white text-[14px] my-2"onClick={() => navigate("/signup")} >Want to Create new account ? <button className="text-blue-400 font-bold cursor-pointer hover:underline">Sign Up</button></p>
      </form>
    </div>
  );
};
export default login