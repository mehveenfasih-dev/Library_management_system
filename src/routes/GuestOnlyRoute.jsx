import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "./routeConstants"
import { useAuth } from "../providers/AuthProvider"

const GuestOnlyRoute = () => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Navigate to={ROUTES.CATALOG} replace /> : <Outlet />
}

export default GuestOnlyRoute
