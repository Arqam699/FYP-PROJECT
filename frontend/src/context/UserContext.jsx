import React, { useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = React.createContext();
function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = React.useState(null);
      const [frontendImage, setFrontendImage] = useState(null);
      const [backendImage, setBackendImage] = useState(null);
      const [selectedImage, setSelectedImage] = useState(null);

  

  const handleCurrentUser = async () => {
    
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      // User not logged in or token invalid - this is expected for unauthenticated users
      setUserData(null);
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);
  const value = {
    serverUrl,userData, setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;