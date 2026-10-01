import { createContext, useContext, useMemo } from "react"
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material"
import { STORAGE_KEYS } from "../constants/app"
import useLocalStorage from "../hooks/useLocalStorage"

const ThemeContext = createContext(null)

const systemMode = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"

const buildTheme = (mode) => {
  const light = mode === "light"

  return createTheme({
    palette: {
      mode,
      primary: { main: light ? "#173B67" : "#3B82F6" },
      background: {
        default: light ? "#eef1f5" : "#080D16",
        paper: light ? "#FFFFFF" : "#111927",
      },
      text: {
        primary: light ? "#172033" : "#F8FAFC",
        secondary: light ? "#667085" : "#A8B3C2",
      },
      divider: light ? "#E2E8F0" : "#27272A",
      success: { main: "#22C55E" },
      warning: { main: "#F59E0B" },
      error: { main: "#EF4444" },
      info: { main: "#38BDF8" },
    },
    shape: { borderRadius: 10 },
  })
}

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorage(STORAGE_KEYS.THEME, systemMode())

  const theme = useMemo(() => buildTheme(mode), [mode])

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode, setMode]
  )

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useColorMode = () => useContext(ThemeContext)

export default ThemeProvider
