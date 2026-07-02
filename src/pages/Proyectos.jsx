import { useEffect, useState } from "react";
import { getProyectos, crearProyecto } from "../api/api";
import Navbar from "../components/Navbar";
import TablaProyectos from "../components/TablaProyectos";

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [alerta, setAlerta] = useState("");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    getProyectos().then(setProyectos);
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    const resp = await crearProyecto({ nombre });
    if (!resp.ok) {
      if (resp.status === 403) setAlerta("No tienes permisos (403 Forbidden)");
      else setAlerta("Error al crear proyecto");
      return;
    }
    setProyectos([...proyectos, resp.data]);
    setNombre("");
  };

  return (
    <div>
      <Navbar />
      <h2>Proyectos</h2>
      {alerta && <div style={{ color: "red" }}>{alerta}</div>}

      <TablaProyectos proyectos={proyectos} />

      {rol && rol.includes("ADMIN") && (
        <form onSubmit={handleCrear}>
          <input
            placeholder="Nombre del proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button type="submit">Crear</button>
        </form>
      )}
    </div>
  );
}