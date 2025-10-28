import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import Topbar from "./components/Topbar";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PalletReport from "./pages/PalletReport";
import History from "./pages/History";
import ForkliftReport from "./pages/ForkLiftReport";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas com Topbar global */}
        <Route
          element={
            <PrivateRoute>
              <Topbar />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pallet-report" element={<PalletReport />} />
          <Route path="/forklift-report" element={<ForkliftReport />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2550}
        hideProgressBar
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
