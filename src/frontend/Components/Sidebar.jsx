import React from "react";
import {
  MdOutlineExplore,
  MdOutlinePlaylistPlay,
  MdThumbUpOffAlt,
  MdOutlineWatchLater,
  MdOutlineHistory,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const navLinkStyle = ({ isActive }) => (isActive ? "active" : "aside-link");

  return (
    <div className="sidebar-container">
      <NavLink to="/" className={navLinkStyle}>
        <div className="flex-center">
          <MdOutlineExplore size={25} />
          <span className="margin-left-sm">Explore</span>
        </div>
      </NavLink>

      <NavLink to="/playlist" className={navLinkStyle}>
        <div className="flex-center">
          <MdOutlinePlaylistPlay size={25} />
          <span className="margin-left-sm">Playlist</span>
        </div>
      </NavLink>

      <NavLink to="/likedvideo" className={navLinkStyle}>
        <div className="flex-center">
          <MdThumbUpOffAlt size={25} />
          <span className="margin-left-sm">Liked Videos</span>
        </div>
      </NavLink>
      <NavLink to="/watchlater" className={navLinkStyle}>
        <div className="flex-center">
          <MdOutlineWatchLater size={25} />
          <span className="margin-left-sm">Watch Later</span>
        </div>
      </NavLink>
      <NavLink to="/history" className={navLinkStyle}>
        <div className="flex-center">
          <MdOutlineHistory size={25} />
          <span className="margin-left-sm">History</span>
        </div>
      </NavLink>
    </div>
  );
}
