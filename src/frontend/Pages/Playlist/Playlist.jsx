import React, { useEffect } from "react";
import { useData } from "../../Contexts/data-context";

export function Playlist() {
  const { state, getAllPlaylist } = useData();
  useEffect(() => {
    getAllPlaylist();
  }, []);

  return (
    <div>
      {state.playlist.map((ele) => {
        ele.title;
      })}
    </div>
  );
}
