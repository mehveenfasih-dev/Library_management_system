import {
  Box,
  Button,
  Typography,
  Paper,
} from "@mui/material";

import { useColorMode } from "../../providers/ThemeProvider";

const Theme = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Theme
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Current Theme: {mode === "light" ? "Light" : "Dark"}
        </Typography>

        <Button
          variant="contained"
          onClick={toggleColorMode}
        >
          Switch to {mode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </Paper>
    </Box>
  );
};

export default Theme;