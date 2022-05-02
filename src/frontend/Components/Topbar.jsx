import React, { useState } from "react";
import { useData } from "../Contexts/data-context";

function Button({ ele }) {
  const { dispatch, state } = useData();
  const [isActive, setIsActive] = useState(false);
  return (
    <button
      className={`btn btn-sm color-secondary-outline chip ${
        state.category[ele.categoryName.toUpperCase()] ? "btn-active" : ""
      }`}
      key={ele._id}
      onClick={() => {
        dispatch({
          type: ele.categoryName.toUpperCase(),
        });
        setIsActive(!isActive);
      }}
    >
      {ele.categoryName}
    </button>
  );
}

export function Topbar() {
  const { state, dispatch } = useData();

  return (
    <div className="topbar-container">
      {state.categoryList.map((ele) => (
        <Button ele={ele} key={ele._id} />
      ))}
    </div>
  );
}
