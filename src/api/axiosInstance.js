import axios from "axios"
import { env } from "../config/env"
import { getErrorMessage } from "../utils/errorMessage"
import { hideLoader, showLoader } from "../store/slices/appSlice"
import { clearAuthCookies, readAuthToken } from "../utils/authCookies"
import { emitNotification } from "../utils/notifications"

const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  withCredentials: true,
})

export const setupInterceptors = ({ dispatch }) => {
  apiClient.interceptors.request.use((config) => {
    const token = readAuthToken()
    if (token && !config.skipAuth) config.headers.Authorization = `Bearer ${token}`
    if (!config.skipLoader) dispatch(showLoader())
    return config
  })

  apiClient.interceptors.response.use(
    (response) => {
      if (!response.config.skipLoader) dispatch(hideLoader())
      return response
    },
    (error) => {
      const config = error.config ?? {}
      if (!config.skipLoader) dispatch(hideLoader())

      const message = getErrorMessage(error)
      if (error.response?.status === 401) clearAuthCookies()
      if (message && !config.skipToast) {
        emitNotification(message, "error")
      }

      error.message = message || error.message
      return Promise.reject(error)
    }
  )
}

export default apiClient