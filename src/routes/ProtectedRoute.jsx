
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "./routeConstants";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;

