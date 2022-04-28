import { Nav, Sidebar } from "./frontend/Components";
import { PageRoutes } from "./frontend/Routes/PageRoutes.jsx";
import "./frontend/Styles/styles.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
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
