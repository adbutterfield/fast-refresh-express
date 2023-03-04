import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { LinkCmp } from "./components";

const Top = lazy(() => import("./Top"));
const Page = lazy(() => import("./Page"));

const App: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Suspending...</div>}>
      <ErrorBoundary>
        <LinkCmp isActive={location.pathname === "/"} to="/">
          Link to Top
        </LinkCmp>
        <br />
        <br />
        <LinkCmp isActive={location.pathname === "/page"} to="/page">
          Link to Page
        </LinkCmp>
        <br />
        <br />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Suspending Top...</div>}>
                <Top />
              </Suspense>
            }
          />
          <Route
            path="/page"
            element={
              <Suspense fallback={<div>Suspending Page...</div>}>
                <Page />
              </Suspense>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
