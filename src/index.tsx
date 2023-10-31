import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App/App";
import eventsStore from "./stores/eventsStore";
import categoryFilter from "./stores/categoryFilter";

const store = { eventsStore, categoryFilter };

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/event-planner">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
