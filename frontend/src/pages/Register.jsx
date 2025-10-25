import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/register.css";
import api from "../services/api";

export default function Register() {
  const nav = useNavigate();

  const [adminKey, setAdminKey] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleRegister(e) {
    e.preventDefault();

    try {
      console.log("Oi?");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register-page">
      <div className="register-container glass">
        <h1>SOS Transpaletes ⚙️</h1>
        <p>Crie sua conta para acessar o sistema de relatórios técnicos.</p>

        <form>
          <input
            onChange={handleChange}
            value={formData.name}
            type="text"
            name="name"
            placeholder="Nome"
            required
          />

          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="E-mail"
            required
          />

          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="Senha"
            required
          />
          <select
            value={formData.role}
            onChange={handleChange}
            name="role"
            defaultValue="employee"
          >
            <option value="employee">Funcionário</option>
            <option value="admin">Administrador</option>
          </select>

          {formData.role === "admin" && (
            <input
              type="password"
              placeholder="Senha de administrador"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              required
            />
          )}

          <button type="submit" className="btn-primary big">
            Registrar
          </button>
        </form>

        <p className="login-link">
          Já possui uma conta?{" "}
          <span onClick={() => nav("/login")}>Faça login</span>
        </p>
      </div>
    </div>
  );
}
