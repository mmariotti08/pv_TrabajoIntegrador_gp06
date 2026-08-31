const ADMINISTRADORES_GESTION = [
  {
    id: 1,
    usuario: "benjamin",
    password: "1234",
    nombre: "Benjamin Ortega",
    sector: "Soporte",
  },
  {
    id: 2,
    usuario: "diego",
    password: "1234",
    nombre: "Diego Cari",
    sector: "Gerencia",
  },
];

export const loginAdministrador = async (usuario, password) => {
  const adminEncontrado = ADMINISTRADORES_GESTION.find(
    (admin) =>
      admin.usuario.toLowerCase() === usuario.trim().toLowerCase() &&
      admin.password === password
  );

  if (!adminEncontrado) {
    throw new Error("Usuario o contraseña incorrectos.");
  }

  const { password: _, ...adminSeguro } = adminEncontrado;

  return adminSeguro;
};

export const obtenerSesionAdmin = () => {
  const sesionGuardada = localStorage.getItem("admin_session");
  return sesionGuardada ? JSON.parse(sesionGuardada) : null;
};

export const guardarSesionAdmin = (admin) => {
  localStorage.setItem("admin_session", JSON.stringify(admin));
};

export const eliminarSesionAdmin = () => {
  localStorage.removeItem("admin_session");
};