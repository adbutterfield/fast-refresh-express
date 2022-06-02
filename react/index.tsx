import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";

const root = document.getElementById("react-app");

if (root) {
  hydrateRoot(
    root,
    <ErrorBoundary>
      <Suspense fallback={<div>Suspending...</div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}
