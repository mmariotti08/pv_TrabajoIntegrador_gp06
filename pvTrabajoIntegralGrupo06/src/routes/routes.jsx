import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Header from "../components/layout/Header";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import ListaClientes from "../views/ListaClientes";
import DetalleCliente from "../views/DetalleCliente";

const PrivateLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/clientes",
            element: <ListaClientes />,
          },
          {
            path: "/clientes/:id",
            element: <DetalleCliente />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);