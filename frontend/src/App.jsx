import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import Instruction from "./pages/Instruction";
import UserContext, { userDataContext } from "./Context/UserContext";
import Home from "./pages/Home";
import Contact from "./pages/Contact";



function App() {
  const {userData, loading} =React.useContext(userDataContext)
  return (
     <Routes>
          <Route path='/' element={loading ? <div className="flex justify-center items-center h-screen"><span className="text-white">Loading…</span></div> : (!userData ? <Navigate to="/signin" /> : (userData?.assistantimage && userData?.assistantname) ? <Home/> : <Navigate to="/customize" />)} />

          <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>

          <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/customize"}/>}/>

        	<Route path='/customize' element={userData?<Customize/>:<Navigate to="/signup"/>} />

          <Route path='/customize2' element={userData?<Customize2/>:<Navigate to="/signup"/>} />

         <Route path="/instruction" element={userData?<Instruction/>:<Navigate to="/signin"/>} />

         <Route path="/contact" element={userData? <Contact />: <Navigate to= "/signin" />}/>

         
          
</Routes>
  );
}

export default App; 