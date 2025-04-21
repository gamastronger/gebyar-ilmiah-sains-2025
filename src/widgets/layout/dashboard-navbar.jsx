import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/masuk");
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`z-40 transition-all ${
        fixedNavbar
          ? "sticky top-4 shadow-md shadow-blue-gray-500/5 rounded-xl py-3 px-6"
          : "py-2 px-4"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* LEFT: Breadcrumbs & Title */}
        <div className="flex flex-col gap-1">
          <Breadcrumbs className="bg-transparent p-0 text-sm">
            <Link to={`/${layout}`}>
              <Typography
                color="white"
                className="opacity-60 hover:opacity-100 hover:text-pink-200 transition"
              >
                {layout}
              </Typography>
            </Link>
            <Typography color="white" className="font-medium capitalize">
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h5" color="white" className="capitalize">
            {page}
          </Typography>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2">
          {/* Sidebar toggle button (mobile only) */}
          <IconButton
            variant="text"
            color="white"
            className="xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon className="h-6 w-6 text-white" />
          </IconButton>

          {/* Logout button */}
          <Button
            variant="text"
            color="white"
            className="hidden xl:flex items-center gap-2 normal-case"
            onClick={handleLogout}
          >
            <UserCircleIcon className="h-5 w-5 text-white" />
            Logout
          </Button>

          {/* Mobile logout icon */}
          <IconButton
            variant="text"
            color="white"
            className="xl:hidden"
            onClick={handleLogout}
          >
            <UserCircleIcon className="h-5 w-5 text-white" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
