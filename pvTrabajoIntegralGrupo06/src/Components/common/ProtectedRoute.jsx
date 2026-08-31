import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";

const ProtectedRoute = () => {
  const { admin } = useAdmin();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;