import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import brandImg from "../../assets/logokabinet.png";

export function Sidenav({ brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const navigate = useNavigate();

  const sidenavTypes = {
    dark: "bg-[#260038]",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin untuk keluar sebagai admin?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("status");
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <IconButton
        variant="text"
        color="purple"
        className="fixed top-4 left-4 z-[101] xl:hidden"
        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
      >
        <i className={`fa-solid ${openSidenav ? "fa-times" : "fa-bars"} text-purple-800`}></i>
      </IconButton>

      <aside
        className={`${sidenavTypes[sidenavType]} fixed inset-y-0 z-[100] h-screen w-64 xl:w-72 transition-transform duration-300 ${
          openSidenav ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 border-r border-purple-900/20 shadow-lg`}
      >
        {/* Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between py-6 px-5 border-b border-purple-900/10">
          <Link to="/" className="flex items-center gap-3 group">
            <Avatar
              src={brandImg}
              alt="Brand Logo"
              size="md"
              className="h-10 w-10 object-cover rounded-full border-2 border-purple-700 shadow transition-all duration-300 group-hover:border-purple-500"
            />
            <div>
              <Typography
                variant="h6"
                className="font-bold text-[#39004f] block transition-all duration-300"
              >
                {brandName}
              </Typography>
              <Typography
                variant="small"
                className="text-[#39004f] block text-xs"
              >
                Dashboard Panel
              </Typography>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="px-3 pt-5 h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
          {routes.map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-5">
              {/* Title */}
              {title && (
                <li className="mx-2 mb-3 block">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-bold uppercase text-xs tracking-wider text-[#39004f] pl-3"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              
              {/* Menu Items */}
              <div className="space-y-1">
                {pages.map(({ icon, name, path }) => (
                  <li key={name} className="relative">
                    <NavLink to={`/${layout}${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "filled" : "text"}
                          className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 w-full ${
                            isActive
                              ? "bg-purple-800 text-white shadow-md"
                              : "hover:bg-purple-800/20 text-[#39004f]"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 ${
                              isActive ? "text-white" : "text-[#5d0081]"
                            }`}
                          >
                            {icon}
                          </div>
                          <span
                            className={`truncate block ${
                              isActive ? "text-white" : "text-[#5d0081]"
                            }`}
                          >
                            {name}
                          </span>
                          
                          {isActive && (
                            <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-purple-300 block"></span>
                          )}
                        </Button>
                      )}
                    </NavLink>
                  </li>
                ))}
              </div>
            </ul>
          ))}
        </div>

        {/* Logout Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-purple-900/10">
          <div className="px-4 py-4">
            <Button
              variant="filled"
              className="flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 w-full bg-purple-800 hover:bg-purple-700 text-white"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-sign-out-alt"></i>
              <span className="block">Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

Sidenav.defaultProps = {
  brandName: "Admin GIS",
};

Sidenav.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;