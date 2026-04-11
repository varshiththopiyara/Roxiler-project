import Preloader from "../Components/Preloader";
import { useAuth } from "../Components/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Preloader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
