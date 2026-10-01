import { Navigate, Outlet } from "react-router-dom"
import PropTypes from "prop-types"
import { ROUTES } from "./routeConstants"
import { useAuth } from "../providers/AuthProvider"

const RoleRoute = ({ role }) => {
  const { user } = useAuth()

  if (user?.role !== role) return <Navigate to={ROUTES.CATALOG} replace />

  return <Outlet />
}

RoleRoute.propTypes = { role: PropTypes.string.isRequired }

export default RoleRoute
