import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Menu as MenuIcon,
  NotificationsNone,
  DarkMode,
  LightMode,
} from "@mui/icons-material";

import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
       
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            fontWeight={700}
          >
            BookHub
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              ml: 2,
              cursor: "pointer",
            }}
          >
            Catalog
          </Typography>
        </Box>

       
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton color="inherit">
            <DarkMode />
          </IconButton>

          <IconButton color="inherit">
            <NotificationsNone />
          </IconButton>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {user?.name || "Guest"}
          </Typography>

          <IconButton color="inherit">
            {user ? "👤" : "○"}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;