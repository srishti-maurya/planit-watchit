import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assests/logo/logo.png";
import { useAuth } from "../Contexts/auth-context";

export function Nav() {
  const { isLoggedIn, logoutHandler, navigate } = useAuth();
  return (
    <>
      <div className="navigation-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="navigation-tools">
          {isLoggedIn ? (
            <>
              <button
                className="btn btn-sm color-primary-outline chip"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm color-primary-outline chip"
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
