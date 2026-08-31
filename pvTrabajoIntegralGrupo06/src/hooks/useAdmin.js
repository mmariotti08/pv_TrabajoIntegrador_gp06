import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export const useAdmin = () => {
  const contexto = useContext(AdminContext);

  if (!contexto) {
    throw new Error("useAdmin debe usarse dentro de AdminProvider");
  }

  return contexto;
};