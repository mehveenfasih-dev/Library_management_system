import { createContext, useContext, useMemo, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@mui/material";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((previousMode) =>
      previousMode === "light" ? "dark" : "light"
    );
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          primary: {
            main: mode === "light" ? "#173B67" : "#3B82F6",
          },

          background: {
            default: mode === "light" ? "#dfe2e6" : "#080D16",
            paper: mode === "light" ? "#FFFFFF" : "#111927",
          },

          text: {
            primary: mode === "light" ? "#172033" : "#F8FAFC",
            secondary: mode === "light" ? "#667085" : "#A8B3C2",
          },

          divider: mode === "light" ? "#E2E8F0" : "#27272A",
          success: {
            main: "#22C55E",
          },

          warning: {
            main: "#F59E0B",
          },

          error: {
            main: "#EF4444",
          },

          info: {
            main: "#38BDF8",
          },
        },
      }),
    [mode]
  );

  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useColorMode = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;