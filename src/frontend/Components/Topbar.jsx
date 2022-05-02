import React from "react";
import { useData } from "../Contexts/data-context";

export function Topbar() {
  const { state, dispatch } = useData();
  return (
    <div className="topbar-container">
      {state.categoryList.map((ele) => (
        <button
          className={`btn btn-sm color-secondary-outline chip`}
          key={ele._id}
          onClick={() =>
            dispatch({
              type: ele.categoryName.toUpperCase(),
            })
          }
        >
          {ele.categoryName}
        </button>
      ))}
    </div>
  );
}
