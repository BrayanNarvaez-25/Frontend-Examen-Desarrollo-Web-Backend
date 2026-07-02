import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../api/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      const rol = decoded.rol || decoded.role || decoded.authorities;
      localStorage.setItem("rol", rol);
      navigate("/proyectos");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <div className="alert-error">{error}</div>}
        <div>
          <label>Usuario</label>
          <input placeholder="usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}