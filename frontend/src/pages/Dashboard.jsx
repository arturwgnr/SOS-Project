import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">
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

          {/* 💬 Card motivacional (só desktop) */}
          <div className="motivational-card glass">
            <h2>
              “Cada relatório é mais do que um arquivo, é um registro da tua
              excelência técnica.” 📋
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}
