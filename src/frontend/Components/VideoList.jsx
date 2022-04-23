import React from "react";
import { useData } from "../Contexts/data-context";
import { VideoCard } from "./VideoCard";

export function VideoList() {
  const { videolist } = useData();
  return (
    <>
      {videolist.map((video) => (
        <VideoCard video={video} key={video._id} />
      ))}
    </>
  );
}
