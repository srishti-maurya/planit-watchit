import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

const useData = () => useContext(DataContext);

function DataProvider({ children }) {
  const [videolist, setVideolist] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(
    () =>
      (async function () {
        try {
          const categoryResponse = await axios.get("/api/categories");
          const response = await axios.get("/api/videos");
          setIsLoader(false);
          setCategory(categoryResponse.data.categories);
          setVideolist(response.data.videos);
        } catch (error) {
          console.error(error);
        }
      })(),
    []
  );

  return (
    <DataContext.Provider
      value={{
        videolist,
        setVideolist,
        category,
        setCategory,
        isLoader,
        setIsLoader,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { useData, DataProvider };
