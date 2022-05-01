import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import {
  MdOutlineWatchLater,
  MdOutlinePlaylistAdd,
  MdOutlineHistory,
  MdThumbUpOffAlt,
} from "react-icons/md";
import { useData } from "../Contexts/data-context";
import { useAuth } from "../Contexts/auth-context";
import { useLocation } from "react-router-dom";

export function getThumbnail(id) {
  return `https://i.ytimg.com/vi/${id}/hq720.jpg`;
}

export function getCreatorImg(id) {
  return `https://yt3.ggpht.com/ytc/${id}`;
}

export function VideoCard({ video }) {
  const [isDropdown, setIsDropdown] = useState(false);
  const {
    state,
    setWatchlaterList,
    deleteWatchlaterItem,
    deleteHistoryItem,
    deleteLikeItem,
  } = useData();
  const { navigate } = useAuth();
  const location = useLocation();

  const matchedWaterlaterItem = state.watchlaterList.find(
    (ele) => ele._id === video._id
  );

  return (
    <div
      className="card-container-vertical"
      onClick={() => navigate(`/explore/${video._id}`)}
    >
      <div className="thumbnail-container">
        <img
          src={getThumbnail(video._id)}
          alt={video.title}
          className="img-responsive video-thumbnail"
        />
        <div
          className="dots-container"
          onMouseEnter={() => setIsDropdown(!isDropdown)}
          onMouseLeave={() => setIsDropdown(false)}
        >
          <HiDotsVertical />
          {isDropdown ? (
            <div className="dropdown-container">
              <p
                className="flex-center dropdown-wrapper"
                onClick={(e) => {
                  e.stopPropagation();
                  {
                    matchedWaterlaterItem
                      ? deleteWatchlaterItem(video._id)
                      : setWatchlaterList(video);
                  }
                }}
              >
                <MdOutlineWatchLater size={18} />
                <span className="margin-left-sm">
                  {matchedWaterlaterItem
                    ? "Remove from watch later"
                    : "Save to watch later"}
                </span>
              </p>
              <p className="flex-center dropdown-wrapper">
                <MdOutlinePlaylistAdd size={18} />
                <span className="margin-left-sm">Save to playlist</span>
              </p>
              {location.pathname === "/history" ? (
                <p
                  className="flex-center dropdown-wrapper"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHistoryItem(video._id);
                  }}
                >
                  <MdOutlineHistory size={18} />
                  <span className="margin-left-sm">Remove from history</span>
                </p>
              ) : null}
              {location.pathname === "/likedvideo" ? (
                <p
                  className="flex-center dropdown-wrapper"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLikeItem(video._id);
                  }}
                >
                  <MdThumbUpOffAlt size={18} />
                  <span className="margin-left-sm">Remove from liked</span>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="card-body-vertical">
        <img
          src={getCreatorImg(video.creatorId)}
          alt={video.title}
          className="avatar avatar-sm"
        />
        <div className="card-vertical-section">
          <div className="text-xs card-heading font-regular">{video.title}</div>
          <div className="text-xs color-text-grey">{video.creator}</div>
          <div className="text-xs color-text-grey">{video.views} views</div>
        </div>
      </div>
    </div>
  );
}
