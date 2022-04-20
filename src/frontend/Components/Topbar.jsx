import React from "react";
import { useData } from "../Contexts/data-context";

export function Topbar() {
  const { category } = useData();
  return (
    <div className="topbar-container">
      {category.map((ele) => (
        <button className="btn btn-sm color-primary-outline chip" key={ele._id}>
          {ele.categoryName}
        </button>
      ))}
    </div>
  );
}
