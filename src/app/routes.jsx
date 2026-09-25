import { Routes, Route } from "react-router-dom";

import { routeConfig } from "./routeConfig";

import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import LandingLayout from "../components/layout/LandingLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

const layouts = {
  auth: AuthLayout,
  dashboard: DashboardLayout,
  landing: LandingLayout,
};

function AppRoutes() {
  return (
    <Routes>
      {routeConfig.map((route) => {
        const Layout = layouts[route.layout];

        const page = route.protected ? (
          <ProtectedRoute>{route.element}</ProtectedRoute>
        ) : (
          route.element
        );

        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Layout>{page}</Layout>}
          />
        );
      })}
    </Routes>
  );
}

export default AppRoutes;