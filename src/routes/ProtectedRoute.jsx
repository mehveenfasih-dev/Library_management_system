import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROUTES } from "./routeConstants"
import { useAuth } from "../providers/AuthProvider"

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
