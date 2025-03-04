import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
