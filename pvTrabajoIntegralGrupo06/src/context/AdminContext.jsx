import { createContext, useState, useEffect } from "react";
import {
  loginAdministrador,
  obtenerSesionAdmin,
  guardarSesionAdmin,
  eliminarSesionAdmin,
} from "../services/adminService";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => obtenerSesionAdmin());

  useEffect(() => {
    if (admin) {
      guardarSesionAdmin(admin);
    } else {
      eliminarSesionAdmin();
    }
  }, [admin]);

  const loginAdmin = async (usuario, password) => {
    const adminValidado = await loginAdministrador(usuario, password);
    setAdmin(adminValidado);
    return adminValidado;
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};