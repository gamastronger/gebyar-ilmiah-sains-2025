import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Button,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Bars3Icon,
  HomeIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";
import { useEffect, useState } from "react";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Extract layout and page from pathname
  const pathSegments = pathname.split("/").filter((el) => el !== "");
  const layout = pathSegments[0] || "dashboard";
  const page = pathSegments[1] || "home";

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isMobileOrTablet = windowWidth < 1024;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/masuk");
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`z-40 transition-all ${
        fixedNavbar
          ? "sticky top-2 md:top-4 shadow-md shadow-blue-gray-500/5 rounded-xl py-2 md:py-3 px-3 md:px-6"
          : "py-1 md:py-2 px-2 md:px-4"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex items-center justify-between w-full">
        {/* LEFT: Mobile menu button & Title */}
        <div className="flex items-center gap-2">
          {/* Sidebar toggle button */}
          <IconButton
            id="sidenav-toggle"
            variant="text"
            color="white"
            className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-white/10"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon className="h-5 w-5 text-white" />
          </IconButton>

          {/* Title section - adaptive for mobile */}
          <div className="flex flex-col">
            {/* Breadcrumbs - hidden on very small screens */}
            <Breadcrumbs className="bg-transparent p-0 text-xs md:text-sm hidden sm:flex">
              <Link to={`/${layout}`} className="flex items-center gap-1">
                <HomeIcon className="h-3.5 w-3.5 text-white opacity-60" />
                <Typography
                  color="white"
                  className="opacity-60 hover:opacity-100 hover:text-pink-200 transition text-xs md:text-sm"
                >
                  {layout}
                </Typography>
              </Link>
              <Typography color="white" className="font-medium capitalize text-xs md:text-sm">
                {page}
              </Typography>
            </Breadcrumbs>
            
            {/* Page title */}
            <Typography variant={isMobile ? "h6" : "h5"} color="white" className="capitalize">
              {page}
            </Typography>
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2">
          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <Typography className="text-xs text-white font-medium">
              Online
            </Typography>
          </div>

          {/* Notification bell */}
          <IconButton 
            variant="text" 
            color="white"
            className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-white/10"
          >
            <div className="relative">
              <BellIcon className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                2
              </span>
            </div>
          </IconButton>

          {/* User profile */}
          <div className="hidden sm:block">
            <Button
              variant="text"
              color="white"
              className="flex items-center gap-2 rounded-lg hover:bg-white/10 py-1.5 px-3"
              
            >
              <Avatar
                size="sm"
                variant="circular"
                alt="Admin User"
                className="h-7 w-7 border border-white/50"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
              />
              <div className="hidden lg:block">
                <Typography variant="small" className="text-white font-medium text-sm">
                  Admin
                </Typography>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile breadcrumb indicator - shown only on very small screens */}
      <div className="flex sm:hidden mt-1 px-1">
        <Typography color="white" className="text-xs opacity-70 capitalize">
          {layout} / {page}
        </Typography>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;