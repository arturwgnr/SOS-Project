import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    nav("/login");
  }

  return (
    <div className="dashboard">
      <header className="topbar glass">
        <h2 className="logo">SOS Transpaletes ⚙️</h2>
        <div className="user-info">
          <p>{user?.name || "Usuário"}</p>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <h1>Bem-vindo, {user?.name?.split(" ")[0]}!</h1>
        <p>Escolha o tipo de relatório que deseja criar:</p>

        <div className="cards-container">
          <div className="card glass" onClick={() => nav("/pallet-report")}>
            <h3>📦 Paleteira</h3>
            <p>Crie relatórios técnicos de manutenção de paleteiras.</p>
          </div>

          <div className="card glass" onClick={() => nav("/forklift-report")}>
            <h3>🏗️ Empilhadeira</h3>
            <p>Relatórios completos de serviços em empilhadeiras.</p>
          </div>

          <div className="card glass" onClick={() => nav("/history")}>
            <h3>🗂️ Histórico</h3>
            <p>Veja todos os relatórios criados e seus detalhes.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
