import React, { useEffect } from "react";
import { Loader, VideoList } from "../../Components";
import { useData } from "../../Contexts/data-context";

export function WatchLater() {
  const { getWatchlaterList, state } = useData();
  useEffect(() => getWatchlaterList(), []);

  return (
    <>
      {state.isLoader ? (
        <Loader />
      ) : state.watchlaterList.length < 1 ? (
        <h3 className="margin-auto color-text-grey">No videos added.</h3>
      ) : (
        <div className="home-container">
          <h3 className="text-center color-text-grey">Watch Later</h3>
          <div className="videolist-container">
            <VideoList list={state.watchlaterList} />
          </div>
        </div>
      )}
    </>
  );
}
