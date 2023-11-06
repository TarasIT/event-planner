import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
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
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
