import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import { useAuth } from "./auth-context";
import { successToast } from "../Utils/toasts";

const DataContext = createContext();

const useData = () => useContext(DataContext);

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
          category: payload,
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
    }
  }

  const initialState = {
    videolist: [],
    category: [],
    watchlaterList: [],
    historyList: [],
    likeList: [],
    isLoader: false,
    error: "",
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

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
