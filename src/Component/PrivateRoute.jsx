import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, allowedRoles, userRole, element }) => {
  // Jika tidak terautentikasi, arahkan ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/auth/masuk" replace />;
  }

  // Jika peran pengguna tidak diizinkan, arahkan ke halaman akses ditolak
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === "admin") {
      return <Navigate to="/admin/Dash-Admin" replace />;
    }
    if (userRole === "peserta") {
      if (localStorage.getItem("status") === "null") {
        return <Navigate to="/onboarding" replace />;
      }
      if (localStorage.getItem("status") === "pending") {
        return <Navigate to="/dashboard/pending" replace />;
      }
      if (localStorage.getItem("status") === "success") {
        return <Navigate to="/dashboard/user" replace />;
      }
    }

    return element;

    return <Navigate to="/auth/forbidden" replace />;
  }

  // Jika lolos semua pemeriksaan, render elemen yang diminta
  return element;
};

export default PrivateRoute;
