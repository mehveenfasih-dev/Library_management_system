
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Loader = () => {
  const loading = useSelector((state) => state.ui.loading);

  if (!loading) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;

