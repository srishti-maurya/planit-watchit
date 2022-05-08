import React, { useState } from "react";
import { VideoCard } from "./VideoCard";
import { MdClose } from "react-icons/md";
import { useData } from "../Contexts/data-context";
import { Loader } from "./Loader";

export function VideoList({ list }) {
  const [playlistInput, setPlaylistInput] = useState("");
  const [displayInput, setDisplayInput] = useState(false);
  const {
    setNewPlaylist,
    state,
    playlistModal,
    setPlaylistModal,
    setPlaylistItem,
    currSelectedVideo,
    deletePlaylistItem,
  } = useData();

  return (
    <>
      <div className="videolist-wrapper">
        {playlistModal ? (
          <div className="playlist-modal">
            <div className="flex-center flex-space">
              <p>Save to...</p>
              <p
                onClick={() => setPlaylistModal(!playlistModal)}
                className="cursor-pointer"
              >
                <MdClose size={25} />
              </p>
            </div>

            <div>
              {state.playlist?.map((list) => {
                const videoInPlaylist = list.videos.find(
                  (playlistVideo) => playlistVideo._id == currSelectedVideo._id
                );
                return (
                  <>
                    {state.isLoader ? (
                      <Loader />
                    ) : (
                      <label className="flex-center" key={list._id}>
                        <input
                          type="checkbox"
                          checked={videoInPlaylist ? true : false}
                          onChange={() => {
                            videoInPlaylist
                              ? deletePlaylistItem(currSelectedVideo, list)
                              : setPlaylistItem(currSelectedVideo, list);
                          }}
                        />
                        {list.title}
                      </label>
                    )}
                  </>
                );
              })}
            </div>

            <div className="create-playlist">
              {displayInput ? (
                <>
                  <input onChange={(e) => setPlaylistInput(e.target.value)} />
                  <button
                    className="btn btn-sm chip flex-center flex-justify-center btn-full-width"
                    onClick={() => {
                      setNewPlaylist(playlistInput);
                    }}
                  >
                    create
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-sm chip flex-center flex-justify-center btn-full-width"
                  onClick={() => {
                    setDisplayInput(!displayInput);
                  }}
                >
                  create playlist
                </button>
              )}
            </div>
          </div>
        ) : null}
        {list?.map((video) => (
          <div key={video._id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </>
  );
}
