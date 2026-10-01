import { Fab } from "@mui/material"
import { Login } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { ROUTES } from "../../routes/routeConstants"

const FloatingLoginButton = () => (
  <Fab
    variant="extended"
    color="primary"
    component={RouterLink}
    to={ROUTES.LOGIN}
    sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 1100, textTransform: "none" }}
  >
    <Login sx={{ mr: 1 }} />
    Sign in
  </Fab>
)

export default FloatingLoginButton
