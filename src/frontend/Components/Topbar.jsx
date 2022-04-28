import React from "react";
import { useData } from "../Contexts/data-context";

export function Topbar() {
  const { state } = useData();
  return (
    <div className="topbar-container">
      {state.category.map((ele) => (
        <button
          className="btn btn-sm color-secondary-outline chip"
          key={ele._id}
        >
          {ele.categoryName}
        </button>
      ))}
    </div>
  );
}
