import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} fixed inset-y-0 z-[100] h-screen w-64 rounded-xl border border-blue-gray-100 shadow-md transition-transform duration-300 ${
        openSidenav ? "translate-x-0" : "-translate-x-full"
      } xl:translate-x-0`}
    >
      {/* Header */}
      <div className="relative flex items-center justify-between py-5 px-6">
        <Link to="/" className="flex items-center gap-3">
          {/* Avatar with size constraints */}
          <Avatar
            src={brandImg}
            alt="Brand Logo"
            size="sm"
            className="h-10 w-10 object-cover rounded-full"
          />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
          >
            {brandName}
          </Typography>
        </Link>
        {/* Close button for mobile */}
        <IconButton
          variant="text"
          color="white"
          className="xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <i className="fa-solid fa-times text-white"></i>
        </IconButton>
      </div>

      {/* Navigation */}
      <div className="px-4 mt-2">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4">
            {title && (
              <li className="mx-2 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase text-xs opacity-70"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className={`flex items-center gap-3 px-4 py-2 text-sm font-medium capitalize rounded-lg transition-all duration-200 ${
                        isActive
                          ? "shadow-md scale-[1.02] bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          : "hover:bg-blue-gray-50 hover:scale-[1.02]"
                      }`}
                      fullWidth
                    >
                      <div className="w-5 h-5">{icon}</div>
                      <span className="truncate">{name}</span>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="gradient"
          color="blue"
          fullWidth
          className="flex items-center justify-center gap-2 text-sm py-2 rounded-xl hover:scale-105"
        >
          <i className="fa-solid fa-arrow-right-from-bracket text-white"></i>
          Logout
        </Button>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Admin GIS",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;