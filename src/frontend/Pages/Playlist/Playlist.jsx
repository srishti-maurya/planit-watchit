import React, { useEffect } from 'react';
import { useData } from '../../Contexts/data-context';
import { getThumbnail } from '../../Utils/getThumbnail';
import { MdPlaylistPlay } from 'react-icons/md';
import { Loader } from '../../Components';

export function PlaylistVideoCard({ video, playlist }) {
  return (
    <div className="card-container-vertical">
      <div className="playlist-thumbnail-title flex-center flex-space">
        <MdPlaylistPlay size={25} />
        <p className="margin-left-md"> {playlist.title}</p>
      </div>
      {playlist.videos.length === 0 ? (
        <div
          style={{
            height: 140,
            backgroundColor: 'black',
          }}
          className="playlist-thumbnail-img"
        ></div>
      ) : (
        <img
          src={getThumbnail(video._id)}
          alt={video.title}
          className="img-responsive playlist-thumbnail-img"
        />
      )}
    </div>
  );
}

export function Playlist() {
  const { state, getAllPlaylist } = useData();
  useEffect(() => {
    getAllPlaylist();
  }, []);
  return (
    <>
      {state.isLoader ? (
        <Loader />
      ) : state.playlist.length < 1 ? (
        <h3 className="margin-auto color-text-grey">No playlist found.</h3>
      ) : (
        <div className="playlist-container">
          {state.playlist.map((singlePlaylist, index) => (
            <PlaylistVideoCard
              playlist={singlePlaylist}
              video={singlePlaylist.videos[0]}
              key={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
