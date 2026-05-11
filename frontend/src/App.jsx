import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import UserContext, { userDataContext } from "./Context/UserContext";
import Home from "./pages/Home";



function App() {
  const {userData, setUserData} =React.useContext(userDataContext)
  return (
     <Routes>
       <Route path='/' element={(userData?.assistantimage && userData?.assistantname) ?<Home/> : <Navigate to="/customize" />} />
        
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/customize"}/>}/>
      <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
        <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signup"}/>}/>
           <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={"/signup"}/>}/>
     </Routes>
  );
}

export default App; 