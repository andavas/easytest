import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import App from "../App";
import Desafio from "../pages/Desafio";
import Login from "../pages/Login";
import Perfil from "../pages/Perfil";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Login />} path="/login" />
        <Route element={<App />} path="/" index />
        <Route element={<Desafio />} path="/desafio" />
        <Route element={<Perfil />} path="/perfil" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
