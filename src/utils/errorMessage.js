import axios from "axios"

export const getErrorMessage = (error) => {
  if (axios.isCancel(error)) return ""

  const status = error?.response?.status
  const message = error?.response?.data?.message ?? error?.response?.data?.error

  if (error?.code === "ECONNABORTED") return "The request timed out. Please try again."
  if (!error?.response) return "Network error. Check your connection."

  switch (status) {
    case 401:
      return "Your session has expired. Please sign in again."
    case 403:
      return "You do not have permission to do that."
    case 404:
      return "We could not find what you were looking for."
    default:
      return status >= 500
        ? "The server had a problem. Please try again shortly."
        : message || "Something went wrong."
  }
}