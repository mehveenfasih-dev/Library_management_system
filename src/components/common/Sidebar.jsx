// import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
// import { Dashboard, LibraryBooks, MenuBook, People, Person, RequestPage } from "@mui/icons-material"
// import { Link, matchPath, useLocation } from "react-router-dom"
// import { useSelector } from "react-redux"
// import PropTypes from "prop-types"

// import { ROUTES } from "../../routes/routeConstants"
// import { HEADER_HEIGHT } from "./Header"

// export const DRAWER_WIDTH = 250

// const memberItems = [
//   { label: "Catalog", path: ROUTES.CATALOG, icon: <MenuBook />, activeFor: [ROUTES.CATALOG, ROUTES.BOOK_DETAILS] },
//   { label: "My requests", path: ROUTES.MY_REQUESTS, icon: <RequestPage />, activeFor: [ROUTES.MY_REQUESTS] },
//   { label: "Profile", path: ROUTES.PROFILE, icon: <Person />, activeFor: [ROUTES.PROFILE] },
// ]

// const adminItems = [
//   { label: "Dashboard", path: ROUTES.DASHBOARD, icon: <Dashboard />, activeFor: [ROUTES.DASHBOARD] },
//   { label: "Books", path: ROUTES.BOOKS, icon: <LibraryBooks />, activeFor: [ROUTES.BOOKS] },
//   { label: "Users", path: ROUTES.USERS, icon: <People />, activeFor: [ROUTES.USERS] },
//   { label: "All requests", path: ROUTES.ALL_REQUESTS, icon: <RequestPage />, activeFor: [ROUTES.ALL_REQUESTS] },
// ]

// const NavSection = ({ title, items, onNavigate }) => {
//   const { pathname } = useLocation()

//   return (
//     <Box sx={{ px: 1.5, py: 2 }}>
//       <Typography
//         variant="caption"
//         color="text.secondary"
//         sx={{ px: 1.5, fontWeight: 700, textTransform: "uppercase" }}
//       >
//         {title}
//       </Typography>

//       <List sx={{ mt: 1 }}>
//         {items.map((item) => (
//           <ListItemButton
//             key={item.path}
//             component={Link}
//             to={item.path}
//             onClick={onNavigate}
//             selected={item.activeFor.some((path) => matchPath({ path, end: true }, pathname))}
//             sx={{ borderRadius: 2, mb: 0.5 }}
//           >
//             <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.label} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Box>
//   )
// }

// NavSection.propTypes = {
//   title: PropTypes.string.isRequired,
//   items: PropTypes.arrayOf(PropTypes.object).isRequired,
//   onNavigate: PropTypes.func,
// }

// const SidebarContent = ({ onNavigate }) => {

//   return (
//     <Box sx={{ width: DRAWER_WIDTH }}>
//       <NavSection title="Member" items={memberItems} onNavigate={onNavigate} />

//       {isAdmin && (
//         <>
//           <Divider />
//           <NavSection title="Admin" items={adminItems} onNavigate={onNavigate} />
//         </>
//       )}
//     </Box>
//   )
// }

// SidebarContent.propTypes = { onNavigate: PropTypes.func }

// const Sidebar = ({ open, isMobile, onClose }) => {
//   if (isMobile) {
//     return (
//       <Drawer open={open} onClose={onClose}>
//         <SidebarContent onNavigate={onClose} />
//       </Drawer>
//     )
//   }

//   return (
//     <Box
//       component="aside"
//       sx={{
//         width: open ? DRAWER_WIDTH : 0,
//         flexShrink: 0,
//         overflow: "hidden",
//         position: "sticky",
//         top: HEADER_HEIGHT,
//         alignSelf: "flex-start",
//         height: `calc(100vh - ${HEADER_HEIGHT}px)`,
//         borderRight: open ? "1px solid" : "none",
//         borderColor: "divider",
//         backgroundColor: "background.paper",
//         transition: "width 0.25s ease",
//       }}
//     >
//       <SidebarContent />
//     </Box>
//   )
// }

// Sidebar.propTypes = {
//   open: PropTypes.bool.isRequired,
//   isMobile: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// }

// export default Sidebar


import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Dashboard, LibraryBooks, MenuBook, People, Person, RequestPage } from "@mui/icons-material"
import { Link, matchPath, useLocation } from "react-router-dom"
import PropTypes from "prop-types"

import { ROUTES } from "../../routes/routeConstants"
import { HEADER_HEIGHT } from "./Header"
import { useAuth } from "../../providers/AuthProvider"
import { useLocale } from "../../providers/LocaleProvider"

export const DRAWER_WIDTH = 250

const memberItems = [
  { label: "Catalog", path: ROUTES.CATALOG, icon: <MenuBook />, activeFor: [ROUTES.CATALOG, ROUTES.BOOK_DETAILS] },
  { label: "My requests", path: ROUTES.MY_REQUESTS, icon: <RequestPage />, activeFor: [ROUTES.MY_REQUESTS] },
  { label: "Profile", path: ROUTES.PROFILE, icon: <Person />, activeFor: [ROUTES.PROFILE] },
]

const adminItems = [
  { label: "Dashboard", path: ROUTES.DASHBOARD, icon: <Dashboard />, activeFor: [ROUTES.DASHBOARD] },
  { label: "Catalog", path: ROUTES.CATALOG, icon: <MenuBook />, activeFor: [ROUTES.CATALOG, ROUTES.BOOK_DETAILS] },
  { label: "Manage Books", path: ROUTES.BOOKS, icon: <LibraryBooks />, activeFor: [ROUTES.BOOKS] },
  { label: "Users", path: ROUTES.USERS, icon: <People />, activeFor: [ROUTES.USERS] },
  { label: "Book requests", path: ROUTES.ALL_REQUESTS, icon: <RequestPage />, activeFor: [ROUTES.ALL_REQUESTS] },
]

const NavSection = ({ title, items, onNavigate }) => {
  const { pathname } = useLocation()
  const { t } = useLocale()

  return (
    <Box sx={{ px: 1.5, py: 2 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ px: 1.5, fontWeight: 700, textTransform: "uppercase" }}
      >
        {t(title)}
      </Typography>

      <List sx={{ mt: 1 }}>
        {items.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            onClick={onNavigate}
            selected={item.activeFor.some((path) => matchPath({ path, end: true }, pathname))}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={t(item.label)} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

NavSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNavigate: PropTypes.func,
}

const SidebarContent = ({ onNavigate }) => {
  const { isAdmin } = useAuth()
  const sectionTitle = isAdmin ? "Admin" : "Member"
  const sidebarItems = isAdmin ? adminItems : memberItems

  return (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <NavSection title={sectionTitle} items={sidebarItems} onNavigate={onNavigate} />
    </Box>
  )
}

SidebarContent.propTypes = { onNavigate: PropTypes.func }

const Sidebar = ({ open, isMobile, onClose }) => {
  if (isMobile) {
    return (
      <Drawer open={open} onClose={onClose}>
        <SidebarContent onNavigate={onClose} />
      </Drawer>
    )
  }

  return (
    <Box
      component="aside"
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        overflow: "hidden",
        position: "sticky",
        top: HEADER_HEIGHT,
        alignSelf: "flex-start",
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        borderRight: open ? "1px solid" : "none",
        borderColor: "divider",
        backgroundColor: "background.paper",
        transition: "width 0.25s ease",
      }}
    >
      <SidebarContent />
    </Box>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Sidebar