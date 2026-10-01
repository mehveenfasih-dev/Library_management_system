import { configureStore } from "@reduxjs/toolkit"

import bookReducer from "./slices/bookSlice"
import userReducer from "./slices/userSlice"
import requestReducer from "./slices/requestSlice"
import appReducer from "./slices/appSlice"

import { errorLogger } from "./middleware/errorLogger"
import { setupInterceptors } from "../api/axiosInstance"
import {logger} from 'redux-logger';
export const store = configureStore({
  reducer: {
    books: bookReducer,
    users: userReducer,
    requests: requestReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorLogger, logger),
})

setupInterceptors(store)

