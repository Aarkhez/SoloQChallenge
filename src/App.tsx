import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import './style.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  );
}
export default App;
