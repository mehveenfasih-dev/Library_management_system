
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,

  notification: {
    open: false,
    message: "",
    severity: "success",
  },
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },

    hideLoader: (state) => {
      state.loading = false;
    },

    showNotification: (state, action) => {
      state.notification = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || "success",
      };
    },

    hideNotification: (state) => {
      state.notification.open = false;
    },
  },
});

export const {
  showLoader,
  hideLoader,
  showNotification,
  hideNotification,
} = uiSlice.actions;

export default uiSlice.reducer;

