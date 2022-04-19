import React from "react";

export function Nav() {
  return (
    <>
      <div className="navigation-container">
        <div className="text-xl color-text-grey font-bold">myBrand</div>
        <div className="navigation-tools">
          <button className="btn btn-color-text-primary round-pill">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
