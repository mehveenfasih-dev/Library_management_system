import { Navigate, Route, Routes } from "react-router-dom"

import { routeConfig } from "./routeConfig"
import { ROUTES } from "../routes/routeConstants"

import AuthLayout from "../components/layout/AuthLayout"
import MainLayout from "../components/layout/MainLayout"
import ProtectedRoute from "../routes/ProtectedRoute"
import RoleRoute from "../routes/RoleRoute"
import GuestOnlyRoute from "../routes/GuestOnlyRoute"
import NotFound from "../pages/notFound/NotFound"

const routesFor = (access) =>
  routeConfig
    .filter((route) => route.access === access)
    .map(({ path, element }) => <Route key={path} path={path} element={element} />)

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.CATALOG} replace />} />

    <Route element={<GuestOnlyRoute />}>
      <Route element={<AuthLayout />}>{routesFor("guestOnly")}</Route>
    </Route>

    <Route element={<MainLayout />}>
      {routesFor("public")}

      <Route element={<ProtectedRoute />}>
        {routesFor("auth")}

        <Route element={<RoleRoute role="admin" />}>{routesFor("admin")}</Route>
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes
