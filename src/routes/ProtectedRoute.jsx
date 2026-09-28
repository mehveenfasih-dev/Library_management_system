import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "./routeConstants";

const ProtectedRoute = ({ children, permission }) => {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );


  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  if (!permission) {
    return children;
  }

  if (user.role === "user") {
    if (permission === "view_books") {
      return children;
    }

    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }


  if (user.role === "admin") {
    const permissions = user.permissions || [];

    
    if (
      permission === "view_books" &&
      (
        permissions.includes("view_books") ||
        permissions.includes("manage_books")
      )
    ) {
      return children;
    }

 
    if (permissions.includes(permission)) {
      return children;
    }

    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  return (
    <Navigate
      to={ROUTES.DASHBOARD}
      replace
    />
  );
};

export default ProtectedRoute;