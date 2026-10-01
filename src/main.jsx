import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, matchPath, useLocation } from "react-router-dom"
import { Provider } from "react-redux"

import App from "./app/App"
import { routeConfig } from "./app/routeConfig"
import { store } from "./store/store"
import AuthProvider from "./providers/AuthProvider"
import LocaleProvider from "./providers/LocaleProvider"
import ThemeProvider from "./providers/ThemeProvider"
import NotificationProvider from "./providers/NotificationProvider"

import Loader from "./components/common/Loader"
import AppSnackbar from "./components/common/AppSnackbar"

import "./styles/global.css"

const GlobalFeedback = () => {
  const { pathname } = useLocation()
  const hasMatchingRoute = routeConfig.some(({ path }) => matchPath({ path, end: true }, pathname))

  if (!hasMatchingRoute) return null

  return (
    <>
      <Loader />
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <LocaleProvider>
            <NotificationProvider>
              <AuthProvider>
                <App />
                <GlobalFeedback />
                <AppSnackbar />
              </AuthProvider>
            </NotificationProvider>
          </LocaleProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
