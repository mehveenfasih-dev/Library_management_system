import { Box, Container } from "@mui/material"

import Header from "../common/Header"
import Footer from "../common/Footer"
import AppBreadcrumbs from "../common/AppBreadcrumbs"
import PageBoundary from "../common/PageBoundary"
import FloatingLoginButton from "../common/FloatingLoginButton"

const GuestLayout = () => (
  <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
    <Header guest />

    <Container maxWidth="xl" component="main" sx={{ flex: 1, py: 3 }}>
      <AppBreadcrumbs />
      <PageBoundary />
    </Container>

    <Footer />
    <FloatingLoginButton />
  </Box>
)

export default GuestLayout
