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
            main: mode === "light" ? "#123B70" : "#3B82F6",
          },

          background: {
            default: mode === "light" ? "#FFFFFF" : "#000000",
            paper: mode === "light" ? "#F5F6F8" : "#111111",
          },

          text: {
            primary: mode === "light" ? "#1F2937" : "#FFFFFF",
            secondary: mode === "light" ? "#4B5563" : "#D1D5DB",
          },

          divider: mode === "light" ? "#D9DDE3" : "#26364F",
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