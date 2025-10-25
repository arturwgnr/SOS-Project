import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const nav = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container glass">
        <h1>SOS Transpaletes ⚙️</h1>
        <p>Entre com suas credenciais para acessar os relatórios.</p>

        <form>
          <input type="email" name="email" placeholder="E-mail" required />
          <input type="password" name="password" placeholder="Senha" required />

          <button type="submit" className="btn-primary big">
            Entrar
          </button>
        </form>

        <p className="register-link">
          Ainda não tem conta?{" "}
          <span onClick={() => nav("/register")}>Crie uma agora</span>
        </p>
      </div>
    </div>
  );
}
