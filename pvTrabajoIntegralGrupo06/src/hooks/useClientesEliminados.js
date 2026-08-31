import { useState } from "react";

const STORAGE_KEY = "clientes_eliminados";

export const useClientesEliminados = () => {
  const [clientesEliminados, setClientesEliminados] = useState(() => {
    const guardados = localStorage.getItem(STORAGE_KEY);

    if (!guardados) return [];

    const datos = JSON.parse(guardados);

    return datos.map((item) =>
      typeof item === "number"
        ? { id: item, nombre: `ID ${item}` }
        : item
    );
  });

  const marcarClienteEliminado = (eliminado) => {
    setClientesEliminados((previos) => {
      const yaExiste = previos.some((item) => item.id === eliminado.id);

      if (yaExiste) {
        return previos;
      }

      const nuevaLista = [...previos, eliminado];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));

      return nuevaLista;
    });
  };

  const obtenerClienteEliminado = (id) => {
    return clientesEliminados.find((item) => item.id === id);
  };

  const limpiarClientesEliminados = () => {
    localStorage.removeItem(STORAGE_KEY);
    setClientesEliminados([]);
  };

  return {
    clientesEliminados,
    marcarClienteEliminado,
    obtenerClienteEliminado,
    limpiarClientesEliminados,
  };
};