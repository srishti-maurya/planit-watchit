import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useAuth } from "./auth-context";
import { successToast } from "../Utils/toasts";

const DataContext = createContext();

const useData = () => useContext(DataContext);

export function filterByCategory(
  data,
  AUDIOBOOK,
  SUMMARY,
  RECOMMENDATIONS,
  BENEFITS,
  ALL
) {
  let filteredlist = [];
  if (
    AUDIOBOOK === false &&
    SUMMARY === false &&
    RECOMMENDATIONS === false &&
    BENEFITS === false &&
    ALL === false
  ) {
    return data;
  }

  if (AUDIOBOOK) {
    return data.filter((item) => item.category === "audiobook");
  }

  if (SUMMARY) {
    return data.filter((item) => item.category === "summary");
  }

  if (RECOMMENDATIONS) {
    return data.filter((item) => item.category === "recommendations");
  }

  if (BENEFITS) {
    return data.filter((item) => item.category === "benefits");
  }
  if (ALL) {
    return data;
  }
  return filteredlist;
}

function DataProvider({ children }) {
  const { token, isLoggedIn, navigate } = useAuth();

  function dataReducer(state, { type, payload }) {
    switch (type) {
      case "SET_VIDEOLIST":
        return {
          ...state,
          videolist: payload,
          isLoader: false,
        };
      case "SET_CATEGORY":
        return {
          ...state,
          categoryList: payload,
          isLoader: false,
        };
      case "SET_WATCHLATER_LIST":
        return {
          ...state,
          watchlaterList: payload,
          isLoader: false,
        };
      case "SET_HISTORY_LIST":
        return {
          ...state,
          historyList: payload,
          isLoader: false,
        };
      case "SET_LIKE_LIST":
        return {
          ...state,
          likeList: payload,
          isLoader: false,
        };
      case "SET_LOADER":
        return {
          ...state,
          isLoader: true,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: payload,
          isLoader: false,
        };
      case "AUDIOBOOK":
        return {
          ...state,
          category: {
            AUDIOBOOK: true,
            SUMMARY: false,
            RECOMMENDATIONS: false,
            BENEFITS: false,
            ALL: false,
          },
        };
      case "SUMMARY":
        return {
          ...state,
          category: {
            AUDIOBOOK: false,
            SUMMARY: true,
            RECOMMENDATIONS: false,
            BENEFITS: false,
            ALL: false,
          },
        };
      case "RECOMMENDATIONS":
        return {
          ...state,
          category: {
            AUDIOBOOK: false,
            SUMMARY: false,
            RECOMMENDATIONS: true,
            BENEFITS: false,
            ALL: false,
          },
        };
      case "BENEFITS":
        return {
          ...state,
          category: {
            AUDIOBOOK: false,
            SUMMARY: false,
            RECOMMENDATIONS: false,
            BENEFITS: true,
            ALL: false,
          },
        };
      case "ALL":
        return {
          ...state,
          category: {
            AUDIOBOOK: false,
            SUMMARY: false,
            RECOMMENDATIONS: false,
            BENEFITS: false,
            ALL: true,
          },
        };
    }
  }

  const initialState = {
    videolist: [],
    categoryList: [],
    watchlaterList: [],
    historyList: [],
    likeList: [],
    isLoader: false,
    error: "",
    category: {
      AUDIOBOOK: false,
      SUMMARY: false,
      RECOMMENDATIONS: false,
      BENEFITS: false,
      ALL: true,
    },
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  const filteredData = filterByCategory(
    state.videolist,
    state.category.AUDIOBOOK,
    state.category.SUMMARY,
    state.category.RECOMMENDATIONS,
    state.category.BENEFITS,
    state.category.ALL
  );

  useEffect(
    () =>
      (async function () {
        try {
          dispatch({
            type: "SET_LOADER",
          });
          const categoryResponse = await axios.get("/api/categories");
          const response = await axios.get("/api/videos");
          dispatch({
            type: "SET_VIDEOLIST",
            payload: response.data.videos,
          });
          dispatch({
            type: "SET_CATEGORY",
            payload: categoryResponse.data.categories,
          });
        } catch (error) {
          console.error(error);
          dispatch({
            type: "SET_ERROR",
            payload: error.response.data.errors[0],
          });
        }
      })(),
    []
  );

  // watchlater

  function getWatchlaterList() {
    if (isLoggedIn) {
      (async function () {
        try {
          dispatch({
            type: "SET_LOADER",
          });
          const watchlaterResponse = await axios.get("/api/user/watchlater", {
            headers: {
              authorization: token,
            },
          });
          dispatch({
            type: "SET_WATCHLATER_LIST",
            payload: watchlaterResponse.data.watchlater,
          });
        } catch (error) {
          console.error(error);
          dispatch({
            type: "SET_ERROR",
            payload: error.response.data.errors[0],
          });
        }
      })();
    }
  }

  function setWatchlaterList(video) {
    if (isLoggedIn) {
      (async function () {
        try {
          dispatch({
            type: "SET_LOADER",
          });
          const response = await axios.post(
            "/api/user/watchlater",
            { video },
            {
              headers: {
                authorization: token,
              },
            }
          );
          successToast("Added to watchlater");
          dispatch({
            type: "SET_WATCHLATER_LIST",
            payload: response.data.watchlater,
          });
        } catch (error) {
          console.error("ERROR", error);
          dispatch({
            type: "SET_ERROR",
            payload: error.response.data.errors[0],
          });
        }
      })();
    } else {
      navigate("/login");
    }
  }

  function deleteWatchlaterItem(_id) {
    (async function () {
      try {
        dispatch({
          type: "SET_LOADER",
        });
        const response = await axios.delete(`/api/user/watchlater/${_id}`, {
          headers: {
            authorization: token,
          },
        });
        successToast("Removed from watchlater");
        dispatch({
          type: "SET_WATCHLATER_LIST",
          payload: response.data.watchlater,
        });
      } catch (error) {
        console.error("ERROR", error);
        dispatch({
          type: "SET_ERROR",
          payload: error.response.data.errors[0],
        });
      }
    })();
  }

  // history

  function getHistoryList() {
    if (isLoggedIn) {
      (async function () {
        try {
          dispatch({
            type: "SET_LOADER",
          });
          const historylist = await axios.get("/api/user/history", {
            headers: {
              authorization: token,
            },
          });
          dispatch({
            type: "SET_HISTORY_LIST",
            payload: historylist.data.history,
          });
        } catch (error) {
          console.error(error);
          dispatch({
            type: "SET_ERROR",
            payload: error.response.data.errors[0],
          });
        }
      })();
    }
  }

  function setHistoryList(video) {
    if (isLoggedIn && video) {
      (async function () {
        try {
          dispatch({
            type: "SET_LOADER",
          });
          const response = await axios.post(
            "/api/user/history",
            { video },
            {
              headers: {
                authorization: token,
              },
            }
          );
          dispatch({
            type: "SET_HISTORY_LIST",
            payload: response.data.history,
          });
        } catch (error) {
          console.error("ERROR", error);
          dispatch({
            type: "SET_ERROR",
            payload: error.response.data.errors[0],
          });
        }
      })();
    } else {
      navigate("/login");
    }
  }

  function deleteHistoryItem(_id) {
    (async function () {
      try {
        dispatch({
          type: "SET_LOADER",
        });
        const response = await axios.delete(`/api/user/history/${_id}`, {
          headers: {
            authorization: token,
          },
        });
        successToast("Removed from history");
        dispatch({
          type: "SET_HISTORY_LIST",
          payload: response.data.history,
        });
      } catch (error) {
        console.error("ERROR", error);
        dispatch({
          type: "SET_ERROR",
          payload: error.response.data.errors[0],
        });
      }
    })();
  }

  function deleteAllHistoryItem() {
    (async function () {
      try {
        dispatch({
          type: "SET_LOADER",
        });
        const response = await axios.delete(`/api/user/history/all`, {
          headers: {
            authorization: token,
          },
        });
        successToast("History cleared");
        dispatch({
          type: "SET_HISTORY_LIST",
          payload: response.data.history,
        });
      } catch (error) {
        console.error("ERROR", error);
        dispatch({
          type: "SET_ERROR",
          payload: error.response.data.errors[0],
        });
      }
    })();
  }

  // like

  function getLikeList() {
    if (isLoggedIn) {
      (async function () {
        try {
          dispatch({
            type: "SET_LOADER",
          });
          const historylist = await axios.get("/api/user/likes", {
            headers: {
              authorization: token,
            },
          });
          dispatch({
            type: "SET_LIKE_LIST",
            payload: historylist.data.likes,
          });
        } catch (error) {
          console.error(error);
          dispatch({
            type: "SET_ERROR",
            payload: error.response.data.errors[0],
          });
        }
      })();
    }
  }

  function setLikeList(video) {
    if (isLoggedIn) {
      (async function () {
        try {
          dispatch({
            type: "SET_LOADER",
          });
          const response = await axios.post(
            "/api/user/likes",
            { video },
            {
              headers: {
                authorization: token,
              },
            }
          );
          successToast("Added to liked videos");
          dispatch({
            type: "SET_LIKE_LIST",
            payload: response.data.likes,
          });
        } catch (error) {
          console.error("ERROR", error);
          dispatch({
            type: "SET_ERROR",
            payload: error.response.data.errors[0],
          });
        }
      })();
    } else {
      navigate("/login");
    }
  }

  function deleteLikeItem(_id) {
    (async function () {
      try {
        dispatch({
          type: "SET_LOADER",
        });
        const response = await axios.delete(`/api/user/likes/${_id}`, {
          headers: {
            authorization: token,
          },
        });
        successToast("Removed from liked videos");
        dispatch({
          type: "SET_LIKE_LIST",
          payload: response.data.likes,
        });
      } catch (error) {
        console.error("ERROR", error);
        dispatch({
          type: "SET_ERROR",
          payload: error.response.data.errors[0],
        });
      }
    })();
  }

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        filteredData,
        getWatchlaterList,
        setWatchlaterList,
        deleteWatchlaterItem,
        getHistoryList,
        setHistoryList,
        deleteHistoryItem,
        deleteAllHistoryItem,
        getLikeList,
        setLikeList,
        deleteLikeItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { useData, DataProvider };
