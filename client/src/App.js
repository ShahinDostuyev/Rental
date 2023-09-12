import React from "react";
import { publicRoutes } from "./routes/PublicRoutes";
import { Route, Routes } from "react-router-dom";
import Header from "./layout/header";
import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import Contact from "./pages/Contact";
import Layout from "./layout/Layout";

import { Provider } from "react-redux";
import store from "./Redux/store";
import { LoginPage } from "./pages/Auth/Login";
import { RegisterPage } from "./pages/Auth/Register";
import { Verify } from "./pages/Auth/Verify";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/verify" element={<Verify />} />

          <Route
            path="*"
            element={
              <>
                <Home />
              </>
            }
          />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
