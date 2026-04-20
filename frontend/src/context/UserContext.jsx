import React from "react";

export const userDataContext = React.createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";

  const value = {
    serverUrl,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;