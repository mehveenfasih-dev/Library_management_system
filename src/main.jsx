
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./app/App";
import { store } from "./store/store";
import ThemeProvider from "./providers/ThemeProvider";

import Loader from "./components/common/Loader";
import AppSnackbar from "./components/common/AppSnackbar";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />

          <Loader />
          <AppSnackbar />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

