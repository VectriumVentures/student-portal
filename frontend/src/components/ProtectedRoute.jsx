import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { role: userRole } = useSelector((state) => state.auth);

  if (!userRole) return <Navigate to="/" />;

  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
