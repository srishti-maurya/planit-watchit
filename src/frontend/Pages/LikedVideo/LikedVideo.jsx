import React, { useEffect } from "react";
import { Loader, VideoList } from "../../Components";
import { useData } from "../../Contexts/data-context";

export function LikedVideo() {
  const { state, getLikeList } = useData();
  useEffect(() => getLikeList(), []);
  return (
    <>
      {state.isLoader ? (
        <Loader />
      ) : state.likeList.length < 1 ? (
        <h3 className="margin-auto color-text-grey">No liked videos found.</h3>
      ) : (
        <div className="home-container">
          <h3 className="text-center color-text-grey">Liked Videos</h3>
          <div className="videolist-container">
            <VideoList list={state.likeList} />
          </div>
        </div>
      )}
    </>
  );
}
