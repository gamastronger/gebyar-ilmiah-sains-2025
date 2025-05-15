import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, allowedRoles, userRole, element }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Jika belum login
    if (!isAuthenticated) {
      if (location.pathname !== "/auth/masuk") {
        navigate("/auth/masuk", { replace: true });
      }
      return;
    }

    // Jika role tidak diperbolehkan
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      const status = localStorage.getItem("status");

      if (userRole === "admin" && location.pathname !== "/admin/Dash-Admin") {
        navigate("/admin/Dash-Admin", { replace: true });
        return;
      }

      if (userRole === "peserta") {
        if (status === "null" && location.pathname !== "/onboarding") {
          navigate("/onboarding", { replace: true });
          return;
        }
        if (status === "pending" && location.pathname !== "/dashboard/pending") {
          navigate("/dashboard/pending", { replace: true });
          return;
        }
        if (status === "success" && location.pathname !== "/dashboard/user") {
          navigate("/dashboard/user", { replace: true });
          return;
        }
      }

      // fallback
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }

      return;
    }

    // Validasi sukses, izinkan render
    setCanRender(true);
  }, [isAuthenticated, allowedRoles, userRole, navigate, location]);

  if (!canRender) return null;

  return element;
};

export default PrivateRoute;