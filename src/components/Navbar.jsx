import { useNavigate } from "react-router-dom";
import { logout } from "../api/api";

export default function Navbar() {
  const rol = localStorage.getItem("rol");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav>
      <a href="/proyectos">Ver Proyectos</a>
      {rol && rol.includes("ADMIN") && (
        <>
          <a href="/proyectos">Gestionar Proyectos</a>
          <a href="/crear-tarea">Crear Tareas</a>
        </>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
}