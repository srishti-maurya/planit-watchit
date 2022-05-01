import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assests/logo/logo.png";
import { useAuth } from "../Contexts/auth-context";
import { GrMoon, GrSun } from "react-icons/gr";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "../Contexts/theme-context";

export function Nav() {
  const { isLoggedIn, logoutHandler, navigate } = useAuth();
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="navigation-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="navigation-tools">
          <div
            className="flex-center theme-icon cursor-pointer"
            onClick={() => setTheme(!theme)}
          >
            {theme ? <IoMoon size={25} /> : <IoSunny size={25} />}
          </div>
          {isLoggedIn ? (
            <>
              <button
                className="btn btn-sm color-secondary-outline chip"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm color-secondary-outline chip"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
