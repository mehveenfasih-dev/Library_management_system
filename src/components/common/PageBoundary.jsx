import { Suspense } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./ErrorFallback"
import PageLoader from "./PageLoader"

// Wraps the routed page: crash fallback + lazy loading fallback.
// The boundary resets whenever the URL changes.
const PageBoundary = () => {
  const { pathname } = useLocation()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}

export default PageBoundary
