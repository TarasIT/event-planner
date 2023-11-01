import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App/App";
import { StoreProvider } from "./mobX/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter basename="/event-planner">
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
