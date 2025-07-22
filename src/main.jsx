import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Order from "./components/Order";
import OwnerLogin from "./components/OwnerLogin";
import OwnerDashboard from "./components/OwnerPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/owner/login" element={<OwnerLogin />} />
      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
    </Routes>
  </BrowserRouter>
);
