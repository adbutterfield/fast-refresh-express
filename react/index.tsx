import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrateRoot } from "react-dom/client";
import { loadableReady } from "@loadable/component";
import App from "./App";

const root = document.getElementById("react-app");

if (root) {
  loadableReady(() => {
    hydrateRoot(
      root,
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  });
}
