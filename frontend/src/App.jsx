import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PalletReport from "./pages/PalletReport";
import History from "./pages/History";
import ForkliftReport from "./pages/ForkLiftReport";
import "./styles/variables.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/pallet-report"
          element={
            <PrivateRoute>
              <PalletReport />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        <Route
          path="/forklift-report"
          element={
            <PrivateRoute>
              <ForkliftReport />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2550}
        hideProgressBar
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
