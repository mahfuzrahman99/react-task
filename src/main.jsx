import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/scss/App.scss";
import { BrowserRouter } from "react-router-dom";
import StateProvider from "./Context/StateProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
