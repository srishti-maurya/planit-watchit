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
  const [isLoader, setIsLoader] = useState(true);

  const { token, isLoggedIn, navigate } = useAuth();

  function dataReducer(state, { type, payload }) {
    switch (type) {
      case "SET_VIDEOLIST":
        return {
          ...state,
          videolist: payload,
        };
      case "SET_CATEGORY":
        return {
          ...state,
          category: payload,
        };
      case "SET_WATCHLATER_LIST":
        return {
          ...state,
          watchlaterList: payload,
        };
      case "SET_HISTORY_LIST":
        return {
          ...state,
          historyList: payload,
        };
    }
  }

  const initialState = {
    videolist: [],
    category: [],
    watchlaterList: [],
    historyList: [],
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(
    () =>
      (async function () {
        try {
          const categoryResponse = await axios.get("/api/categories");
          const response = await axios.get("/api/videos");
          setIsLoader(false);
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
        }
      })(),
    []
  );

  // watchlater

  function getWatchlaterList() {
    if (isLoggedIn) {
      (async function () {
        try {
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
        }
      })();
    }
  }

  function setWatchlaterList(video) {
    if (isLoggedIn) {
      (async function () {
        try {
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
        }
      })();
    } else {
      navigate("/login");
    }
  }

  function deleteWatchlaterItem(_id) {
    (async function () {
      try {
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
      }
    })();
  }

  // history

  function getHistoryList() {
    if (isLoggedIn) {
      (async function () {
        try {
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
        }
      })();
    }
  }

  function setHistoryList(video) {
    if (isLoggedIn) {
      (async function () {
        try {
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
        }
      })();
    } else {
      navigate("/login");
    }
  }

  function deleteHistoryItem(_id) {
    (async function () {
      try {
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
      }
    })();
  }

  function deleteAllHistoryItem() {
    (async function () {
      try {
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
      }
    })();
  }

  return (
    <DataContext.Provider
      value={{
        state,
        isLoader,
        setIsLoader,
        getWatchlaterList,
        setWatchlaterList,
        deleteWatchlaterItem,
        getHistoryList,
        setHistoryList,
        deleteHistoryItem,
        deleteAllHistoryItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { useData, DataProvider };
