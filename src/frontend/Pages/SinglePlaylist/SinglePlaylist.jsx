import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../Contexts/data-context';
import { getThumbnail } from '../../Utils/getThumbnail';
import { MdPlaylistPlay, MdDeleteForever } from 'react-icons/md';
import { useAuth } from '../../Contexts/auth-context';

export default function SinglePlaylist() {
  const { playlistId } = useParams();
  const { state, getAllPlaylist, deletePlaylist, deletePlaylistItem } =
    useData();
  const { navigate } = useAuth();
  const playlist = state.playlist?.find((each) => each._id === playlistId);
  useEffect(() => {
    getAllPlaylist();
  }, [playlistId]);

  return (
    <div className="card-container-vertical playlist-layout">
      <div className="card-container-vertical">
        <div className="playlist-thumbnail-title flex-center flex-space">
          <MdPlaylistPlay size={25} />
          <p className="margin-left-md"> {playlist.title}</p>
        </div>
        <div className="playlist-thumbnail-img bg-black-sm "></div>
        <button
          className="btn btn-sm chip"
          onClick={() => {
            deletePlaylist(playlist._id);
            navigate('/playlist');
          }}
        >
          Delete Playlist
        </button>
      </div>
      <div className="card-vertical-section">
        {playlist.videos.map((video) => (
          <>
            <div
              className="flex-center m-1 thumbnail-container"
              onClick={() => navigate(`/explore/${video._id}`)}
            >
              <img
                src={getThumbnail(video._id)}
                alt={playlist.title}
                className="img-responsive width-md"
              />
              <div className="card-vertical-section">
                <div className="text-sm card-heading font-regular">
                  {video.title}
                </div>
                <div className="text-sm color-text-grey">{video.creator}</div>
                <div className="text-sm color-text-grey">
                  {video.views} views
                </div>
              </div>
              <div
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePlaylistItem(video, playlist);
                }}
              >
                <MdDeleteForever size={25} />
              </div>
            </div>
            <div className="divider"></div>
          </>
        ))}
      </div>
    </div>
  );
}
