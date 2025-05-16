import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "peserta") {
        navigate("/dashboard/user", { replace: true });
      } else if (role === "admin") {
        navigate("/admin", { replace: true });
      }
    } else {
      // Tidak login, render elemen Auth
      setShouldRender(true);
    }
  }, [navigate]);

  // Render halaman Auth hanya jika user belum login
  return shouldRender ? element : null;
};

export default AuthPrivateRoute;