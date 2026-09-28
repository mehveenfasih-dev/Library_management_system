import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  MenuBook,
  RequestPage,
  Person,
  Dashboard,
  LibraryBooks,
  People,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../routes/routeConstants";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  const isAdmin = user?.role === "admin";

  const memberItems = [
    {
      label: "Catalog",
      path: ROUTES.CATALOG,
      icon: <MenuBook />,
    },
    {
      label: "My Requests",
      path: ROUTES.MY_REQUESTS,
      icon: <RequestPage />,
    },
    {
      label: "Profile",
      path: ROUTES.PROFILE,
      icon: <Person />,
    },
  ];

  const adminItems = [
    {
      label: "Dashboard",
      path: ROUTES.DASHBOARD,
      icon: <Dashboard />,
    },
    {
      label: "Books",
      path: ROUTES.BOOKS,
      icon: <LibraryBooks />,
    },
    {
      label: "Users",
      path: ROUTES.USERS,
      icon: <People />,
    },
    {
      label: "All Requests",
      path: ROUTES.ALL_REQUESTS,
      icon: <RequestPage />,
    },
  ];

  return (
    <Box
      component="aside"
      sx={{
        width: 250,
        flexShrink: 0,
        borderRight: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        minHeight: "100%",
      }}
    >
      {/* MEMBER */}
      <Box sx={{ px: 2, pt: 3 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            px: 1,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Member
        </Typography>

        <List sx={{ mt: 1 }}>
          {memberItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* ADMIN */}
      {isAdmin && (
        <>
          <Divider />

          <Box sx={{ px: 2, pt: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                px: 1,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Admin
            </Typography>

            <List sx={{ mt: 1 }}>
              {adminItems.map((item) => (
                <ListItemButton
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Sidebar;