import Preloader from "../Components/Preloader";
import { useAuth } from "../Components/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Preloader />;
  const from = location.state?.from?.pathname || "/dashboard";

  return user ? <Navigate to={from} replace /> : <Outlet />;
};

export default PublicRoutes;