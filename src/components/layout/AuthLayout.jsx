import { Box, Paper } from "@mui/material";

const AuthLayout = ({ children, maxWidth = 450 }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        px: 2,
        py: 5,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth,
          p: { xs: 3, sm: 4, md: 5 },
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default AuthLayout;