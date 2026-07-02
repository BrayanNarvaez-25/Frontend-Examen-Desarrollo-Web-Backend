const BASE_URL = "http://localhost:8080/api";

export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json();
}

export async function logout() {
  const token = localStorage.getItem("token");
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.clear();
}

export async function getProyectos() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/proyectos/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function crearProyecto(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/proyectos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return { ok: res.ok, status: res.status, data: res.ok ? await res.json() : null };
}

export async function crearTarea(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/tareas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return { ok: res.ok, status: res.status, data: res.ok ? await res.json() : null };
}