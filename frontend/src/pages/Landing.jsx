import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="landing">
      <nav className="navbar">
        <div className="logo">SOS</div>
        <div className="nav-links">
          <button onClick={() => nav("/login")} className="btn-text">
            Login
          </button>
          <button onClick={() => nav("/register")} className="btn-primary">
            Registrar Conta
          </button>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-text">
          <h1>
            Relatórios técnicos <span>sem papel, sem erro.</span>
          </h1>
          <p>
            O sistema <strong>SOS Transpaletes</strong> digitaliza o processo de
            manutenção de paleteiras e empilhadeiras. Crie, armazene e consulte
            relatórios com segurança e agilidade.
          </p>

          <button onClick={() => nav("/login")} className="btn-glass big">
            Entrar no Sistema
          </button>
        </div>

        <div className="hero-visual">
          <div className="card-balance glass">
            <h3>📋 Relatório</h3>
            <p>Paleteira #245</p>
            <span>Emitido por Edimar</span>
          </div>

          <div className="card-forecast glass">
            <h3>⚙️ Manutenção</h3>
            <p>Empilhadeira #102</p>
            <span>Status: Concluído</span>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 SOS Transpaletes — Desenvolvido por Artur Wagner</p>
      </footer>
    </div>
  );
}
