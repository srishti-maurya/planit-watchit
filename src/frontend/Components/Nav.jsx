import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assests/logo/logo.png";

export function Nav() {
  return (
    <>
      <div className="navigation-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="navigation-tools">
          <button className="btn btn-sm color-primary-outline chip">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
