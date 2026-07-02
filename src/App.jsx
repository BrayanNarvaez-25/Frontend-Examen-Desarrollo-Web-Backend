import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Proyectos from "./pages/Proyectos";
import PrivateRoute from "./components/PrivateRoute";
import CrearTarea from "./pages/CrearTarea";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/proyectos" element={<PrivateRoute><Proyectos /></PrivateRoute>} />
<Route path="/crear-tarea" element={<PrivateRoute rolRequerido="ADMIN"><CrearTarea /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}