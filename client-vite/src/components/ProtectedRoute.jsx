import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getStoredToken, getStoredUser } from "../services/authService";

/**
 * Protects user (candidate/interviewer) routes: only allows access if user is logged in
 * and is not admin (admin should use /admin/*). Otherwise redirects to /login.
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;
