import React, { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";

const Top = lazy(() => import("./Top"));
const Page = lazy(() => import("./Page"));

const App: React.FC = () => (
  <>
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
  </>
);

export default App;
