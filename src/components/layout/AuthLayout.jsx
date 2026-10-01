import { Box, Paper } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import { ROUTES } from "../../routes/routeConstants"

const AuthLayout = () => {
  const { pathname } = useLocation()
  const maxWidth = pathname === ROUTES.REGISTER ? 700 : 450

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        px: 2,
        py: 5,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth,
          p: { xs: 3, sm: 4, md: 5 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  )
}

export default AuthLayout
