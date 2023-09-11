import React from "react";
import { publicRoutes } from "./routes/PublicRoutes";
import { Route, Routes } from "react-router-dom";
import Header from "./layout/header";
import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import Contact from "./pages/Contact";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <>
              <Home />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
