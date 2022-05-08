import React, { useEffect } from "react";
import { useData } from "../../Contexts/data-context";

export function Playlist() {
  const { state, getAllPlaylist, getPlaylistItem } = useData();
  useEffect(() => {
    getAllPlaylist();
  }, []);

  return (
    <div>
      {state.playlist.map((ele) => {
        // getPlaylistItem(ele._id);

        ele.title;
      })}
    </div>
  );
}
