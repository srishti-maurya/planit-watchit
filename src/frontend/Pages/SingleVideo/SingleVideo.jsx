import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../Contexts/data-context";
import ReactPlayer from "react-player";
import { getCreatorImg } from "../../Components/VideoCard";
import {
  MdOutlinePlaylistPlay,
  MdThumbUpOffAlt,
  MdOutlineWatchLater,
  MdWatchLater,
  MdThumbUp,
} from "react-icons/md";
import { useAuth } from "../../Contexts/auth-context";
import { Loader } from "../../Components";

export function getVideoUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function SingleVideo() {
  const { videoId } = useParams();
  const {
    state,
    setWatchlaterList,
    deleteWatchlaterItem,
    setHistoryList,
    setLikeList,
    deleteLikeItem,
  } = useData();
  const { token } = useAuth();
  const video = state.videolist?.find((each) => each._id === videoId);
  const matchedWaterlaterItem = state.watchlaterList.find(
    (ele) => ele._id === video._id
  );
  const matchedLikedItem = state.likeList.find((ele) => ele._id === video._id);

  useEffect(() => {
    setHistoryList(video);
  }, [videoId, token, video]);

  return (
    <>
      {state.isLoader ? (
        <Loader />
      ) : video ? (
        <div className="single-video-container">
          <ReactPlayer
            playing
            controls={true}
            url={getVideoUrl(video._id)}
            width="100%"
            height="100%"
          />
          <div className="flex-center-col">
            <div className="flex-center flex-space">
              <div className="flex-center-col">
                <div className="text-base card-heading font-regular margin-top-md">
                  {video.title}
                </div>
                <div className="text-sm color-text-grey">
                  {video.views} views
                </div>
              </div>
              <div className="flex-center flex-gap-md">
                <span className="cursor-pointer">
                  <MdOutlinePlaylistPlay size={25} />
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    {
                      matchedLikedItem
                        ? deleteLikeItem(video._id)
                        : setLikeList(video);
                    }
                  }}
                >
                  {matchedLikedItem ? (
                    <MdThumbUp size={25} />
                  ) : (
                    <MdThumbUpOffAlt size={25} />
                  )}
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    {
                      matchedWaterlaterItem
                        ? deleteWatchlaterItem(video._id)
                        : setWatchlaterList(video);
                    }
                  }}
                >
                  {matchedWaterlaterItem ? (
                    <MdWatchLater size={25} />
                  ) : (
                    <MdOutlineWatchLater size={25} />
                  )}
                </span>
              </div>
            </div>
            <div className="horizontal-line"></div>
            <div className="flex-center margin-top-md">
              <img
                src={getCreatorImg(video.creatorId)}
                alt={video.title}
                className="avatar"
              />
              <div className="margin-left-md">
                <div className="text-base">{video.creator}</div>
                <div className="text-sm color-text-grey">
                  {video.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
