import React from "react";
import loader from "../Assests/svg/loader.svg";

export function Loader() {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
}
