import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/register.css";

export default function Register() {
  const nav = useNavigate();

  const [adminKey, setAdminKey] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const adminPass = "paumagiu";

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e) {
    e.preventDefault();
    console.log("submit funcionando");

    try {
      if (formData.password !== repeatPassword) {
        return toast.error("Senhas não coincidem!");
      }

      if (formData.role === "admin" && adminKey !== adminPass) {
        return toast.error("Senha de admin incorreta!");
      }

      const res = await axios.post("http://localhost:5000/register", formData);

      console.log(res.data);

      toast.success("Usuario registrado com sucesso!");
      nav("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register-page">
      <div className="register-container glass">
        <h1>SOS Transpaletes ⚙️</h1>
        <p>Crie sua conta para acessar o sistema de relatórios técnicos.</p>

        <form onSubmit={handleRegister}>
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
            autoComplete="off"
            placeholder="Senha"
            required
          />
          <input
            type="password"
            name="password2"
            autoComplete="off"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            placeholder="Repetir senha"
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
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
