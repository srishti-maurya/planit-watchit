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
import { Login } from "../Pages/Auth/Login";
import { Logout } from "../Pages/Auth/Logout";
import { Signup } from "../Pages/Auth/Signup";

export function PageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/likedvideo" element={<LikedVideo />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
