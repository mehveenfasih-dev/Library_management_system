
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Button,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../store/slices/authSlice";
import { removeUser } from "../../utils/storage";
import { ROUTES } from "../../routes/routeConstants";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: ROUTES.DASHBOARD,
    },
    {
      label: "Books",
      path: ROUTES.BOOKS,
    },
    {
      label: "Library",
      path: ROUTES.LIBRARY,
    },
    {
      label: "Users",
      path: ROUTES.USERS,
    },
    {
      label: "Theme",
      path: ROUTES.THEME,
    },
    {
      label: "Contact",
      path: ROUTES.CONTACT,
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">
            Library Management System
          </Typography>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

  
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Toolbar />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: 4,
          mt: 8,
          backgroundColor: "background.default",
          color: "text.primary",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
