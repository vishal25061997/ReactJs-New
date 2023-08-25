import React from "react";
import { Navigate } from "react-router-dom";

export const PriventGoBack = ({ children }) => {
  const auth = localStorage.getItem("token");
  if (auth) {
    return <Navigate to="/auth" />;
  }
  return children;
};