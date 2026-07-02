import { useState, useEffect } from "react";
import { crearTarea, getProyectos } from "../api/api";
import Navbar from "../components/Navbar";

export default function CrearTarea() {
  const [descripcion, setDescripcion] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [costoEstimado, setCostoEstimado] = useState("");
  const [prioridad, setPrioridad] = useState("ALTA");
  const [proyectoId, setProyectoId] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState("");
  const [exito, setExito] = useState("");

  useEffect(() => {
    getProyectos().then(setProyectos);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta("");
    setExito("");

    const nuevaTarea = {
      descripcion,
      fechaLimite,
      costoEstimado: parseFloat(costoEstimado),
      prioridad,
      proyecto: { id: parseInt(proyectoId) },
      empleados: [],
    };

    const resp = await crearTarea(nuevaTarea);

    if (!resp.ok) {
      if (resp.status === 403) {
        setAlerta("No tienes permisos para crear tareas (403 Forbidden)");
      } else if (resp.status === 400) {
        setAlerta("Prioridad no válida");
      } else {
        setAlerta("Error al crear la tarea");
      }
      return;
    }

    setExito("Tarea creada correctamente");
    setDescripcion("");
    setFechaLimite("");
    setCostoEstimado("");
    setProyectoId("");
  };

  return (
    <div>
      <Navbar />
      <h2>Crear Tarea</h2>

      {alerta && <div className="alert-error">{alerta}</div>}
      {exito && <div className="alert-success">{exito}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Descripción</label>
          <input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fecha límite</label>
          <input
            type="date"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Costo estimado</label>
          <input
            type="number"
            step="0.01"
            value={costoEstimado}
            onChange={(e) => setCostoEstimado(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Prioridad</label>
          <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
            <option value="ALTA">ALTA</option>
            <option value="MEDIA">MEDIA</option>
            <option value="BAJA">BAJA</option>
          </select>
        </div>

        <div>
          <label>Proyecto</label>
          <select value={proyectoId} onChange={(e) => setProyectoId(e.target.value)} required>
            <option value="">-- Selecciona un proyecto --</option>
            {proyectos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
}