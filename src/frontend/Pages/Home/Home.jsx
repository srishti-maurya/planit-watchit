import React from "react";
import { Loader, Topbar, VideoList } from "../../Components";
import { useData } from "../../Contexts/data-context";
export function Home() {
  const { state, filteredData } = useData();

  return (
    <>
      {state.isLoader ? (
        <Loader />
      ) : (
        <div className="home-container">
          <Topbar />
          <div className="videolist-container">
            <VideoList list={filteredData} />
          </div>
        </div>
      )}
    </>
  );
}
