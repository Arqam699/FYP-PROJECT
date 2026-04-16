
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import tailwindcss from "tailwindcss";
import "./index.css";

import {BrowserRouter, createBrowserRouter} from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
