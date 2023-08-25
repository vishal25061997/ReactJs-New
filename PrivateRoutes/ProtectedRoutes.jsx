import React from "react";
import { Navigate } from "react-router-dom";
const ProctedRoute = ({ children }) => {
  const auth = localStorage.getItem("token");
  if (!auth) {
    return (
      <div>
        <Navigate to="/auth" />
        <Navigate to="/expenseStore" />
      </div>
    );
  }
  return children;
};

export default ProctedRoute;