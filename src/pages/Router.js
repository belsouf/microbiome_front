import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./Home";
import Projects from "./projects";
import Organizations from "./organizations";
import Login from "./Login";
import NotFound from "./404";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/organizations" element={<Organizations />} />
      <Route path="/login" element={<Login />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/*" element={<Navigate to="/404" replace />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
