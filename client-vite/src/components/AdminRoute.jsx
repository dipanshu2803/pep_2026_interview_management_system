import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getStoredToken, getStoredUser } from "../services/authService";

/**
 * Protects admin routes: only allows access if user is logged in and has role "admin".
 * Otherwise redirects to /admin/login.
 */
const AdminRoute = ({ children }) => {
  const location = useLocation();
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
};

export default AdminRoute;
