import { Breadcrumbs, Link, Typography } from "@mui/material"
import { Link as RouterLink, matchPath, useLocation, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { routeConfig } from "../../app/routeConfig"
import { ROUTES } from "../../routes/routeConstants"
import { selectCatalog } from "../../store/slices/bookSlice"
import { useLocale } from "../../providers/LocaleProvider"
import { useAuth } from "../../providers/AuthProvider"

const useCrumbs = () => {
  const { pathname } = useLocation()
  const { id } = useParams()
  const { isAdmin } = useAuth()
  const { books: catalogBooks } = useSelector(selectCatalog)
  const book = catalogBooks.find((item) => item.id === id)

  const route = routeConfig.find((item) => matchPath(item.path, pathname))
  const isBookDetails = Boolean(matchPath(ROUTES.BOOK_DETAILS, pathname))
  const crumbs = []

  // Admins start from the dashboard. Guests and members start from the catalog.
  if (isAdmin && route?.path !== ROUTES.DASHBOARD) {
    crumbs.push({ label: "Dashboard", to: ROUTES.DASHBOARD })
  }

  if (isBookDetails) {
    crumbs.push({ label: "Catalog", to: ROUTES.CATALOG })
    crumbs.push({ label: book?.title ?? "Book details", translate: !book?.title })
  } else {
    crumbs.push({ label: route?.breadcrumb ?? "Page not found" })
  }

  return crumbs
}

const AppBreadcrumbs = () => {
  const crumbs = useCrumbs()
  const { t } = useLocale()

  return (
    <Breadcrumbs separator="›" sx={{ mb: 2, maxWidth: "100%" }}>
      {crumbs.map((crumb) =>
        crumb.to ? (
          <Link
            key={crumb.label}
            component={RouterLink}
            to={crumb.to}
            underline="hover"
            color="text.secondary"
          >
            {crumb.translate === false ? crumb.label : t(crumb.label)}
          </Link>
        ) : (
          <Typography
            key={crumb.label}
            color="text.primary"
            fontWeight={600}
            noWrap
            sx={{ maxWidth: { xs: 200, sm: 480 } }}
          >
            {crumb.translate === false ? crumb.label : t(crumb.label)}
          </Typography>
        )
      )}
    </Breadcrumbs>
  )
}

export default AppBreadcrumbs
