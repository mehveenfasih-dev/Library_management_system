import { Box } from "@mui/material";

import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";

const AppLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Header />

      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <Sidebar />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            py: 3,
          }}
        >
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default AppLayout;