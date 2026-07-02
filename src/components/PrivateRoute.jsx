import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, rolRequerido }) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido && !(rol && rol.includes(rolRequerido))) {
    return <Navigate to="/proyectos" replace />;
  }

  return children;
}