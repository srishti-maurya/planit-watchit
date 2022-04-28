import React from "react";
import { VideoCard } from "./VideoCard";

export function VideoList({ list }) {
  return (
    <>
      {list?.map((video) => (
        <VideoCard video={video} key={video._id} />
      ))}
    </>
  );
}
