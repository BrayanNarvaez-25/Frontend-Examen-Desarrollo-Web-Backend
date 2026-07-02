export default function TablaProyectos({ proyectos }) {
  if (!proyectos || proyectos.length === 0) {
    return <p>No hay proyectos registrados.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {proyectos.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}