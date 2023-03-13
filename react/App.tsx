import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import loadable from "@loadable/component";
import ErrorBoundary from "./ErrorBoundary";
import LinkCmp from "@components/Link";

<<<<<<< HEAD
const Top = loadable(() => import("./Top"));
const Page = loadable(() => import("./Page"));
=======
const Top = lazy(() => import("@pages/Top"));
const Page = lazy(() => import("@pages/Page"));
>>>>>>> main

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
