import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Socket from "./provider/Socket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Socket>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Socket>
  </React.StrictMode>
);
