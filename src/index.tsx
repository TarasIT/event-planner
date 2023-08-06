import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/event-planner">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
