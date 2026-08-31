const API_URL = "https://fakestoreapi.com/users";
const STORAGE_CLIENTES_CREADOS = "clientes_creados";

const obtenerClientesCreadosLocal = () => {
  const guardados = localStorage.getItem(STORAGE_CLIENTES_CREADOS);
  return guardados ? JSON.parse(guardados) : [];
};

const guardarClientesCreadosLocal = (clientes) => {
  localStorage.setItem(STORAGE_CLIENTES_CREADOS, JSON.stringify(clientes));
};

const generarNuevoId = (clientesApi, clientesLocales) => {
  const ids = [...clientesApi, ...clientesLocales].map((cliente) =>
    Number(cliente.id)
  );

  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

export const obtenerClientes = async () => {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los clientes.");
  }

  const clientesApi = await respuesta.json();
  const clientesLocales = obtenerClientesCreadosLocal();

  const listaCompleta = [...clientesApi, ...clientesLocales];

  return listaCompleta.sort((a, b) => Number(a.id) - Number(b.id));
};

export const obtenerClientePorId = async (id) => {
  const idNumerico = Number(id);
  const clientesLocales = obtenerClientesCreadosLocal();

  const clienteLocal = clientesLocales.find(
    (cliente) => Number(cliente.id) === idNumerico
  );

  if (clienteLocal) {
    return clienteLocal;
  }

  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la información del cliente.");
  }

  return await respuesta.json();
};

export const crearCliente = async (cliente) => {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo registrar el cliente.");
  }

  const clientesApi = await fetch(API_URL).then((res) => res.json());
  const clientesLocales = obtenerClientesCreadosLocal();

  const nuevoCliente = {
    ...cliente,
    id: generarNuevoId(clientesApi, clientesLocales),
  };

  const nuevaListaLocal = [...clientesLocales, nuevoCliente].sort(
  (a, b) => Number(a.id) - Number(b.id)
);

  guardarClientesCreadosLocal(nuevaListaLocal);

  return nuevoCliente;
};

export const eliminarClientePorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el cliente.");
  }

  return await respuesta.json();
};