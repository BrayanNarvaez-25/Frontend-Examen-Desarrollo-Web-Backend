import { useEffect, useState } from "react";
import { getProyectos, crearProyecto } from "../api/api";
import Navbar from "../components/Navbar";
import TablaProyectos from "../components/TablaProyectos";

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [alerta, setAlerta] = useState("");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    getProyectos().then(setProyectos);
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    const resp = await crearProyecto({ nombre, descripcion, fechaInicio });
    if (!resp.ok) {
      if (resp.status === 403) setAlerta("No tienes permisos (403 Forbidden)");
      else setAlerta("Error al crear proyecto");
      return;
    }
    setProyectos([...proyectos, resp.data]);
    setNombre("");
    setDescripcion("");
    setFechaInicio("");
  };

  return (
    <div>
      <Navbar />
      <h2>Proyectos</h2>
      {alerta && <div className="alert-error">{alerta}</div>}

      <TablaProyectos proyectos={proyectos} />

      {rol && rol.includes("ADMIN") && (
        <form onSubmit={handleCrear}>
          <div>
            <label>Nombre del proyecto</label>
            <input
              placeholder="nombre-proyecto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción</label>
            <input
              placeholder="descripción breve"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div>
            <label>Fecha de inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </div>
          <button type="submit">Crear</button>
        </form>
      )}
    </div>
  );
}