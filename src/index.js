import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

const root = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.hydrateRoot(rootElement, root);
