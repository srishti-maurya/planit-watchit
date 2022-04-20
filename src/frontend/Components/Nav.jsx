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
          <button className="btn btn-color-text-primary round-pill">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
