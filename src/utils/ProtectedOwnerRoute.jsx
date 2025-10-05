// ProtectedOwnerRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedOwnerRoute = ({ children }) => {
  const token = localStorage.getItem("ownerToken");
  return token ? children : <Navigate to="/owner-login" />;
};

export default ProtectedOwnerRoute;
