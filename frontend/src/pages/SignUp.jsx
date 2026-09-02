import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.png';
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";
function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
const [err,setErr] = React.useState("")
  const[loading,setLoading] = React.useState(false)

  const {serverUrl,userData, setUserData} = React.useContext(userDataContext)
  const [name,setName]  = React.useState("");
  const [email,setEmail]  = React.useState("");
  const [password,setPassword]  = React.useState(""); 

 const handleSignin= async(e)=>{
  e.preventDefault();
  setErr("")
  setLoading(true)
    try {
      let result =await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},{withCredentials:true})
       setUserData(result.data)
      setLoading(false)
      navigate("/customize")
    } catch (error) {
      console.log(error)
      setUserData(null)
      setErr(error.response.data.message)
      setLoading(false)

    }
  }
  return (
    <div className='w-full h-[100vh] bg-cover flex items-center justify-center' style={{backgroundImage:`url(${image2})`}}>
      <form className='w-[80%] h-120 max-w-[450px] bg-[#0000002f] backdrop-blur
      shadow-lg drop-shadow-blue-950 flex justify-center items-center flex-col gap-4 pt-4'onSubmit={handleSignin}>
      <h1 className="text-blue-200  text-[30px] font-bold m-8" >Register to <span className="text-blue-300">Virual</span> <span className="text-blue-400">Assistant</span> </h1>
     <input type="text" autoFocus placeholder="Enter your Name" className="w-85 h-12 outline-none border-2 px-7 py-5 border-white bg-transparent  placeholder:text-white rounded-full text-[16px] text-blue-100 transition-all duration-300 hover:shadow-[0_0_10px_rgba(96,165,250,0.6)] focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]" required onChange={(e)=>setName(e.target.value )} value={name} />

     <input type="text" placeholder="Enter your Email" className="w-85 h-12 outline-none border-2 px-7 py-5 my-3  border-white placeholder:text-white rounded-full text-[16px] text-blue-100 transition-all duration-300 hover:shadow-[0_0_10px_rgba(96,165,250,0.6)] focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]" required onChange={(e)=>setEmail(e.target.value )} value={email} />
    
    <div className="relative">
  <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-85 h-12 rounded-full   text-blue-100 border-2 outline-none placeholder:text-white px-7 pr-12 py-5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(96,165,250,0.6)] focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]" required onChange={(e)=>setPassword(e.target.value )} value={password} />
  {showPassword?(
  < IoMdEyeOff className="absolute top-3 right-5 w-6 h-6 cursor-pointer text-blue-200" onClick={togglePasswordVisibility  } />
    ):(
    <FaEye className="absolute top-3 right-5 w-6 h-6 cursor-pointer text-blue-200" onClick={togglePasswordVisibility} />
    )}
</div>
{err && err.length>0 && <p className="text-red-500 text-3">{err}</p>}
       <button className="w-30 h-10 tracking-wide  bg-blue-600/30 backdrop-blur-md border border-blue-400/30 text-white rounded-2xl text-[16px] font-semibold hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer" disabled={loading}>
         {loading ? "Creating" : "Sign Up"}
       </button>

        <p className="text-white tracking-wide font-medium text-[17px] my-2 "  onClick={()=>{navigate("/signin")}}>Already have an account ? <button className="text-blue-400 font-bold cursor-pointer hover:underline">Sign In</button></p>
      </form>
    </div>
  );
};
export default SignUp
