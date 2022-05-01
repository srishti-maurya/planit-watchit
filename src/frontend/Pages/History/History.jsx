import React, { useEffect } from "react";
import { Loader, VideoList } from "../../Components";
import { useData } from "../../Contexts/data-context";

export function History() {
  const { state, getHistoryList, deleteAllHistoryItem } = useData();
  useEffect(() => getHistoryList(), []);

  return (
    <>
      {state.isLoader ? (
        <Loader />
      ) : state.historyList.length < 1 ? (
        <h3 className="margin-auto color-text-grey">No history found.</h3>
      ) : (
        <div className="home-container">
          <div className="flex-center flex-space">
            <h3 className="text-center color-text-grey">History</h3>
            <button
              className="btn btn-sm chip"
              onClick={() => deleteAllHistoryItem()}
            >
              Clear History
            </button>
          </div>
          <div className="videolist-container">
            <VideoList list={state.historyList} />
          </div>
        </div>
      )}
    </>
  );
}
