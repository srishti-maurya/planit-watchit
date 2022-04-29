import { Nav, Sidebar } from "./frontend/Components";
import { PageRoutes } from "./frontend/Routes/PageRoutes.jsx";
import "./frontend/Styles/styles.css";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./frontend/Contexts/theme-context";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme ? "" : "dark-theme"}`}>
      <Nav />
      <ToastContainer />
      <div className="page-container">
        <Sidebar />
        <PageRoutes />
      </div>
    </div>
  );
}

export default App;
