
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { ROUTES } from "../../routes/routeConstants";

const LandingLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Library Management System
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to={ROUTES.BOOKS}
          >
            Books
          </Button>

          <Button
            color="inherit"
            component={Link}
            to={ROUTES.CONTACT}
          >
            Contact
          </Button>

          <Button
            color="inherit"
            component={Link}
            to={ROUTES.LOGIN}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          py: 5,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default LandingLayout;

