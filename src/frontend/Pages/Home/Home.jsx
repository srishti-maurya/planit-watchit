import React from "react";
import { Topbar, Sidebar, VideoList, Nav } from "../../Components";

export function Home() {
  return (
    <>
      <div className="home-container">
        <Topbar />
        <div className="videolist-container">
          <VideoList />
        </div>
      </div>
    </>
  );
}
