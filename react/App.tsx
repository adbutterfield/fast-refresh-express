import React, { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const Top = lazy(() => import("./Top"));
const Page = lazy(() => import("./Page"));

const App: React.FC = () => (
  <Suspense fallback={<div>Suspending...</div>}>
    <ErrorBoundary>
      <Link to="/">Link to Top</Link>
      <br />
      <br />
      <Link to="/page">Link to Page</Link>
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/page" element={<Page />} />
      </Routes>
    </ErrorBoundary>
  </Suspense>
);

export default App;
