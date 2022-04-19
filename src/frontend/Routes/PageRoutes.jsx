import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  History,
  Home,
  LikedVideo,
  NotFound,
  Playlist,
  WatchLater,
} from "../Pages";

export function PageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/likedvideo" element={<LikedVideo />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
