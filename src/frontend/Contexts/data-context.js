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
    }
  }

  const initialState = {
    videolist: [],
    category: [],
    watchlaterList: [],
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

  return (
    <DataContext.Provider
      value={{
        state,
        isLoader,
        setIsLoader,
        getWatchlaterList,
        setWatchlaterList,
        deleteWatchlaterItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { useData, DataProvider };
