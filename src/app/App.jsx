import { ErrorBoundary } from "react-error-boundary"
import AppRoutes from "./routes"
import ErrorFallback from "../components/common/ErrorFallback"

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AppRoutes />
  </ErrorBoundary>
)

export default App
