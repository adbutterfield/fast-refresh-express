import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("react-app");

if (root) {
  hydrateRoot(
    root,
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
