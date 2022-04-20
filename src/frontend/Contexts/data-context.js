import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

const useData = () => useContext(DataContext);

function DataProvider({ children }) {
  const [videolist, setVideolist] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(
    () =>
      (async function () {
        try {
          const response = await axios.get("/api/videos");
          setVideolist(response.data.videos);
          const categoryResponse = await axios.get("/api/categories");
          setCategory(categoryResponse.data.categories);
        } catch (error) {
          console.error(error);
        }
      })(),
    []
  );

  return (
    <DataContext.Provider
      value={{ videolist, setVideolist, category, setCategory }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { useData, DataProvider };
