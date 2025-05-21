import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isTokenExpired } from "../configs/isTokenExpired";

const SmartRoute = ({ element, authOnly = false, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const status = localStorage.getItem("status");

  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Hapus token jika sudah expired
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("status");
      navigate("/auth/masuk", { replace: true });
      return;
    }

    // Untuk halaman auth (hanya untuk guest)
    if (authOnly) {
      if (token) {
        // Sudah login, redirect berdasarkan role & status
        if (role === "admin") {
          navigate("/admin/Dash-Admin", { replace: true });
          return;
        } else if (role === "peserta") {
          if (status === "null") {
            navigate("/onboarding", { replace: true });
            return;
          } else if (status === "pending") {
            navigate("/dashboard/user", { replace: true });
            return;
          } else if (status === "success") {
            navigate("/dashboard/user", { replace: true });
            return;
          }
        }
        // Default fallback kalau role tidak terduga
        navigate("/", { replace: true });
        return;
      } else {
        // Belum login → boleh akses halaman auth
        setCanRender(true);
        return;
      }
    }

    // Halaman butuh login
    if (!token) {
      navigate("/auth/masuk", { replace: true });
      return;
    }

    // Jika ada pembatasan role, cek
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      // Role tidak sesuai → redirect ke halaman sesuai role
      if (role === "admin") {
        navigate("/admin/Dash-Admin", { replace: true });
        return;
      } else if (role === "peserta") {
        if (status === "null") {
          navigate("/onboarding", { replace: true });
          return;
        } else if (status === "pending") {
          navigate("/dashboard/user", { replace: true });
          return;
        } else if (status === "success") {
          navigate("/dashboard/user", { replace: true });
          return;
        }
      }
      // Kalau role sama sekali tidak dikenali
      navigate("/", { replace: true });
      return;
    }

    // Kalau lolos semua cek, render komponen
    setCanRender(true);
  }, [token, role, status, authOnly, allowedRoles, location, navigate]);

  if (!canRender) return null;
  return element;
};

export default SmartRoute;