
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import tailwindcss from "tailwindcss";
import "./index.css";
import UserContext from "./context/userContext.jsx";

import {BrowserRouter, createBrowserRouter} from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <UserContext>
    <App />
  </UserContext>  
  </BrowserRouter>
);
