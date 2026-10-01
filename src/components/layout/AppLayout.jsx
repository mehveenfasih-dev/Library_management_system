import { useState } from "react"
import { Box, useMediaQuery } from "@mui/material"

import Header from "../common/Header"
import Sidebar from "../common/Sidebar"
import Footer from "../common/Footer"
import AppBreadcrumbs from "../common/AppBreadcrumbs"
import PageBoundary from "../common/PageBoundary"

const AppLayout = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"), { noSsr: true })
  const [open, setOpen] = useState(() => window.innerWidth >= 900)

  const toggleSidebar = () => setOpen((prev) => !prev)
  const closeSidebar = () => setOpen(false)

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
      <Header onMenuClick={toggleSidebar} />

      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar open={open} isMobile={isMobile} onClose={closeSidebar} />

        <Box component="main" sx={{ flex: 1, minWidth: 0, px: { xs: 2, sm: 3, md: 4 }, py: 3 }}>
          <AppBreadcrumbs />
          <PageBoundary />
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

export default AppLayout
