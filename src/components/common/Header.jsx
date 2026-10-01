import { useState } from "react"
import { AppBar, Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import {
  DarkMode,
  LightMode,
  Language,
  Logout,
  Menu as MenuIcon,
  NotificationsNone,
  Person,
} from "@mui/icons-material"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

import { useColorMode } from "../../providers/ThemeProvider"
import { useLocale } from "../../providers/LocaleProvider"
import { ROUTES } from "../../routes/routeConstants"
import { useAuth } from "../../providers/AuthProvider"
import { useNotification } from "../../providers/NotificationProvider"

export const HEADER_HEIGHT = 64

const Header = ({ guest = false, onMenuClick }) => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { mode, toggleColorMode } = useColorMode()
  const { locale, toggleLocale, t } = useLocale()
  const { notify } = useNotification()
  const [anchor, setAnchor] = useState(null)

  const closeMenu = () => setAnchor(null)

  const handleProfile = () => {
    closeMenu()
    navigate(ROUTES.PROFILE)
  }

  const handleLogout = () => {
    closeMenu()
    signOut()
    notify(t("You have been signed out."))
    navigate(ROUTES.CATALOG)
  }

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
      <Toolbar sx={{ justifyContent: "space-between", minHeight: HEADER_HEIGHT }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!guest && (
            <IconButton color="inherit" onClick={onMenuClick} aria-label={t("Toggle menu")}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            fontWeight={700}
            component={RouterLink}
            to={ROUTES.CATALOG}
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            BookHub
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Button
            color="inherit"
            size="small"
            startIcon={<Language />}
            onClick={toggleLocale}
            aria-label={t(locale === "en" ? "Switch to French" : "Switch to English")}
            sx={{ minWidth: 54, px: 1 }}
          >
            {locale.toUpperCase()}
          </Button>

          <IconButton color="inherit" onClick={toggleColorMode} aria-label={t("Toggle theme")}>
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>

          {!guest && (
            <>
              <IconButton color="inherit" aria-label={t("Notifications")}>
                <NotificationsNone />
              </IconButton>

              <IconButton onClick={(event) => setAnchor(event.currentTarget)} aria-label={t("Account menu")}>
                <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 15 }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
                <MenuItem disabled sx={{ opacity: "1 !important" }}>
                  <Typography variant="body2" color="text.secondary">
                    {user?.name}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleProfile}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  {t("Profile")}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  {t("Logout")}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  guest: PropTypes.bool,
  onMenuClick: PropTypes.func,
}

export default Header
