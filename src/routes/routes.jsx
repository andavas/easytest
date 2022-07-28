import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import App from "../App";
import Desafio from "../pages/Desafio";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/" index />
        <Route element={<Desafio />} path="/desafio" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
