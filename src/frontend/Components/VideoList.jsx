import React, { useState } from 'react';
import { VideoCard } from './VideoCard';
import { MdClose } from 'react-icons/md';
import { useData } from '../Contexts/data-context';

export function VideoList({ list }) {
  const [playlistInput, setPlaylistInput] = useState('');
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
      {playlistModal ? (
        <div className="modal modal-interstitial">
          <div className="modal-container">
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
                    (playlistVideo) =>
                      playlistVideo._id == currSelectedVideo._id
                  );
                  return (
                    <label className="flex-center" key={list._id}>
                      <input
                        className="checkbox-playlist-title"
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
                  );
                })}
              </div>

              <div className="create-playlist">
                {displayInput ? (
                  <>
                    <input
                      onChange={(e) => setPlaylistInput(e.target.value)}
                      value={playlistInput}
                    />
                    <button
                      className="btn btn-sm chip flex-center flex-justify-center btn-full-width"
                      onClick={() => {
                        setPlaylistInput('');
                        setNewPlaylist(playlistInput);
                        setDisplayInput(!displayInput);
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
          </div>
        </div>
      ) : null}
      {list?.map((video) => (
        <div key={video._id}>
          <VideoCard video={video} />
        </div>
      ))}
    </>
  );
}
