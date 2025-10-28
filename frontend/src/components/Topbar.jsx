import { useNavigate, Outlet } from "react-router-dom";
import "../styles/dashboard.css"; // pode reaproveitar esse CSS

export default function Topbar() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    nav("/");
  }

  return (
    <div className="dashboard">
      <header className="topbar glass">
        <h2
          className="logo"
          onClick={() => nav("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Dashboard
        </h2>

        <div className="user-info">
          <p>{user?.name || "Usuário"}</p>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <Outlet /> {/* Aqui entra o conteúdo das páginas */}
      </main>
    </div>
  );
}
