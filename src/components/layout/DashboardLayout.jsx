import { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Dashboard,
  MenuBook,
  LibraryBooks,
  People,
  Palette,
} from "@mui/icons-material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { logout } from "../../store/slices/authSlice";
import { removeUser } from "../../utils/storage";

import { ROUTES } from "../../routes/routeConstants";
import AppBreadcrumbs from "../common/AppBreadcrumbs";

const drawerWidth = 250;

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

 
  const handleLogout = () => {
    removeUser();

    dispatch(logout());

    navigate(ROUTES.LOGIN);
  };

  
  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  
  const menuItems = [
    {
      label: "Dashboard",
      path: ROUTES.DASHBOARD,
      icon: <Dashboard />,
    },

    {
      label: "Books",
      path: ROUTES.BOOKS,
      permission: "view_books",
      icon: <MenuBook />,
    },

    {
      label: "Library",
      path: ROUTES.LIBRARY,
      permission: "manage_library",
      icon: <LibraryBooks />,
    },

    {
      label: "Users",
      path: ROUTES.USERS,
      permission: "manage_users",
      icon: <People />,
    },

    {
      label: "Theme",
      path: ROUTES.THEME,
      permission: "manage_theme",
      icon: <Palette />,
    },
  ];


  const canAccess = (item) => {

    if (!item.permission) {
      return true;
    }

    
    if (
      user?.role === "user" &&
      item.permission === "view_books"
    ) {
      return true;
    }

 
    if (user?.role === "admin") {
      const permissions = user?.permissions || [];

     
      if (
        item.permission === "view_books" &&
        (
          permissions.includes("view_books") 
        )
      ) {
        return true;
      }

      return permissions.includes(
        item.permission
      );
    }

    return false;
  };

  
  const visibleMenuItems =
    menuItems.filter(canAccess);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >

      <Drawer
        variant="persistent"
        open={sidebarOpen}
        sx={{
          width: sidebarOpen ? drawerWidth : 0,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",

            backgroundColor: "background.paper",
            color: "text.primary",

            borderRight: "1px solid",
            borderColor: "divider",

            transition: "width 0.25s ease",
          },
        }}
      >

         <Toolbar
          sx={{
            minHeight: "64px !important",
            px: 2.5,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              letterSpacing: "-0.3px",
            }}
          >
            BookHub
          </Typography>
        </Toolbar>

        <Divider />

      
        <List
          sx={{
            px: 1.5,
            py: 2,
          }}
        >

          {visibleMenuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,

                color: "text.secondary",

                "& .MuiListItemIcon-root": {
                  color: "text.secondary",
                  minWidth: 42,
                },

                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",

                  "& .MuiListItemIcon-root": {
                    color: "text.primary",
                  },
                },

                "&.Mui-selected": {
                  backgroundColor: "action.selected",
                  color: "primary.main",

                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },

                "&.Mui-selected:hover": {
                  backgroundColor: "action.selected",
                },
              }}
            >

              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
              />

            </ListItemButton>
          ))}

        </List>

      </Drawer>

     
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          transition: "margin-left 0.25s ease",
        }}
      >

     
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: sidebarOpen
              ? `calc(100% - ${drawerWidth}px)`
              : "100%",

            ml: sidebarOpen
              ? `${drawerWidth}px`
              : 0,

            backgroundColor: "background.paper",
            color: "text.primary",

            borderBottom: "1px solid",
            borderColor: "divider",

            transition:
              "width 0.25s ease, margin-left 0.25s ease",
          }}
        >

          <Toolbar
            sx={{
              justifyContent: "space-between",
              minHeight: "64px !important",
            }}
          >

            
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >

              <IconButton
                onClick={toggleSidebar}
                color="inherit"
                edge="start"
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                Library Management System
              </Typography>

            </Box>

          
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >

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
                {user?.name}
              </Typography>

              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                }}
              >
                Logout
              </Button>

            </Box>

          </Toolbar>

        </AppBar>

       
        <Box
          component="main"
          sx={{
            minHeight: "100vh",

            pt: "88px",

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            pb: 4,

            backgroundColor: "background.default",
            color: "text.primary",
          }}
        >
          <AppBreadcrumbs/>
          {children}
        </Box>

      </Box>

    </Box>
  );
};

export default DashboardLayout;