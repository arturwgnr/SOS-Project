import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/login.css";

export default function Login() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", formData);

      localStorage.setItem("user", JSON.stringify(res.data.existingUser));

      toast.success("Login realizado com sucesso!");
      nav("/dashboard");

      console.log(res.data);
    } catch (error) {
      toast.error("Dados incorretos!");
      console.error(error);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container glass">
        <h1>SOS Transpaletes ⚙️</h1>
        <p>Entre com suas credenciais para acessar os relatórios.</p>

        <form onSubmit={handleLogin}>
          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            placeholder="E-mail"
            required
          />
          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Senha"
            required
          />

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
