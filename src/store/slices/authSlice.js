
import { createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser } from "../../utils/storage";

const storedUser = getUser();

const initialState = {
  user: storedUser,
  isAuthenticated: Boolean(storedUser),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      removeUser();

      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

