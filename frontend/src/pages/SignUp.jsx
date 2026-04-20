import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import signup from '../assets/signup-pics/signup.png';
import signup1 from '../assets/signup-pics/signup1.jpg';
import signup2 from '../assets/signup-pics/signup2.jpg';
import signup3 from '../assets/signup-pics/signup3.jpg';
import signup4 from '../assets/signup-pics/signup4.jpg';
import signup5 from '../assets/signup-pics/signup5.png';
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";
function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {serverUrl} = React.useContext(userDataContext)

  const [name,setName]  = React.useState("");
  const [email,setEmail]  = React.useState("");
  const [password,setPassword]  = React.useState(""); 

 const handleSignUp= async(e)=>{
  e.preventDefault();
    try {
      let result =await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},{withCredentials:true})
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-cover flex items-center justify-center' style={{backgroundImage:`url(${signup2})`}}>
      <form className='w-[80%] h-120 max-w-[450px] bg-[#0000002f] backdrop-blur
      shadow-lg drop-shadow-blue-950 flex justify-center items-center flex-col gap-4 'onSubmit={handleSignUp}>
      <h1 className="text-blue-200 text-[30px] font-bold m-7" >Register to <span className="text-blue-300">Virual</span> <span className="text-blue-400">Assistant</span> </h1>
     <input type="text" placeholder="Enter your Name" className="w-90 h-12 outline-none border-2 px-7 py-5 border-white bg-transparent placeholder:text-cyan-100 rounded-full text-[16px] text-blue-100" required onChange={(e)=>setName(e.target.value )} value={name} /> 

     <input type="text" placeholder="Enter your Email" className="w-90 h-12 outline-none border-2 px-7 py-5 my-3 border-white placeholder:text-cyan-100 rounded-full text-[16px] text-blue-100" required onChange={(e)=>setEmail(e.target.value )} value={email} />
    
    <div className="relative">
  <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-90 h-12 rounded-full text-blue-100 border-2 outline-none placeholder:text-cyan-100 px-7 pr-12 py-5" required onChange={(e)=>setPassword(e.target.value )} value={password} />
  {showPassword?(
  < IoMdEyeOff className="absolute top-3 right-5 w-6 h-6 cursor-pointer text-blue-200" onClick={togglePasswordVisibility  } />
    ):(
    <FaEye className="absolute top-3 right-5 w-6 h-6 cursor-pointer text-blue-200" onClick={togglePasswordVisibility} />
    )}
</div>

       <button className="w-70 h-10 bg-blue-400 text-white rounded-full text-[16px] font-bold hover:bg-blue-600 transition duration-300 cursor-pointer mt-3">Sign Up</button>

        <p className="text-white text-[15px] my-2 ">Already have an account? <button className="text-blue-400 font-bold cursor-pointer hover:underline">SignIn</button></p>
      </form>
    </div>
  );
};
export default SignUp
 