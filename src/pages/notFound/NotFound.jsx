import { Box, Button, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { ROUTES } from "../../routes/routeConstants"
import { useLocale } from "../../providers/LocaleProvider"

const NotFound = () => {
  const { t } = useLocale()

  return (
  <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: 2, textAlign: "center", bgcolor: "background.default" }}>
    <Typography variant="h1" fontWeight={800} color="primary">
      404
    </Typography>

    <Typography variant="h5" fontWeight={600} mt={1}>
      {t("Page not found")}
    </Typography>

    <Typography color="text.secondary" mt={1} mb={3}>
      {t("The page you are looking for does not exist or has been moved.")}
    </Typography>

    <Button variant="contained" component={RouterLink} to={ROUTES.CATALOG}>
      {t("Back to catalog")}
    </Button>
  </Box>
  )
}

export default NotFound
