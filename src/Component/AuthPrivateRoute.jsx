import React from "react";
import { Navigate } from "react-router-dom";

const AuthPrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "peserta") {
      return <Navigate to="/dashboard/user" replace />;
    }
    if (role === "admin") {
      return <Navigate to="/admin/Dash-Kti" replace />;
    }
  }

  return element; // kalau belum login, biarkan akses halaman auth
};

export default AuthPrivateRoute;