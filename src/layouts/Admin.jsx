import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";

export function Admin() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#260038] relative">
      {/* Sidebar Desktop */}
      <div className="hidden sm:block">
        <Sidenav
          routes={routes}
          brandImg={
            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
          }
          sidebarOpen={true}
          setSidebarOpen={setSidebarOpen}
          isDesktop
        />
      </div>

      {/* Sidebar Mobile */}
      <div className="sm:hidden">
        <Sidenav
          routes={routes}
          brandImg={
            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
          }
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 sm:ml-64 xl:ml-72 ml-0 p-4 transition-all duration-300">
        {/* Navbar */}
        <DashboardNavbar />
        {/* Page Content */}
        <div className="mt-4 p-4 bg-white rounded-xl shadow-md">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/Dash-Admin" replace />} />
            {routes.map(
              ({ layout, pages }) =>
                layout === "admin" &&
                pages.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
        {/* Footer */}
        <div className="mt-10 text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Admin.displayName = "/src/layout/admin.jsx";

export default Admin;