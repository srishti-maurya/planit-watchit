import React from "react";
import { Topbar, VideoList } from "../../Components";
import loader from "../../Assests/svg/loader.svg";
import { useData } from "../../Contexts/data-context";
export function Home() {
  const { isLoader, state } = useData();
  return (
    <>
      {isLoader ? (
        <img src={loader} alt="loader" className="loader" />
      ) : (
        <div className="home-container">
          <Topbar />
          <div className="videolist-container">
            <VideoList list={state.videolist} />
          </div>
        </div>
      )}
    </>
  );
}
