import { Suspense } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import { routeConfig } from "./routeConfig";

import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import LandingLayout from "../components/layout/LandingLayout";

import ProtectedRoute from "../routes/ProtectedRoute";

import PageLoader from "../components/common/PageLoader";

// const layouts = {
//   auth: AuthLayout,
//   dashboard: DashboardLayout,
//   landing: LandingLayout,
// };

const layouts = {
  auth: AuthLayout,
  app: AppLayout,
};

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {routeConfig.map((route) => {
          const Layout = layouts[route.layout];

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout {...route.layoutProps}>
                  {route.protected ? (
                    <ProtectedRoute
                      permission={route.permission}
                    >
                      {route.element}
                    </ProtectedRoute>
                  ) : (
                    route.element
                  )}
                </Layout>
              }
            />
          );
        })}

      </Routes>
    </Suspense>
  );
}

export default AppRoutes;