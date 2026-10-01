import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pendingRequests: 0,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.pendingRequests += 1
    },
    hideLoader: (state) => {
      state.pendingRequests = Math.max(0, state.pendingRequests - 1)
    },
  },
})

export const { showLoader, hideLoader } = appSlice.actions

export const selectIsLoading = (state) => state.app.pendingRequests > 0

export default appSlice.reducer