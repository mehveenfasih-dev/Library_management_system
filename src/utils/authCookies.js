import { STORAGE_KEYS } from "../constants/app"
import { readJSON, removeKey } from "./storage"

const COOKIE_KEYS = {
  USER: "lms_user",
  AUTHENTICATED: "lms_is_authenticated",
  TOKEN: "lms_token",
}

const cookieOptions = (maxAge) =>
  `Path=/; Max-Age=${maxAge}; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`

const readCookie = (key) => {
  if (typeof document === "undefined") return null
  const cookie = document.cookie.split("; ").find((item) => item.startsWith(`${key}=`))
  return cookie ? decodeURIComponent(cookie.slice(key.length + 1)) : null
}

export const readAuthToken = () => readCookie(COOKIE_KEYS.TOKEN)

export const writeAuthCookies = ({ user, token }) => {
  const options = cookieOptions(60 * 60 * 24 * 7)
  document.cookie = `${COOKIE_KEYS.USER}=${encodeURIComponent(JSON.stringify(user))}; ${options}`
  document.cookie = `${COOKIE_KEYS.AUTHENTICATED}=true; ${options}`
  document.cookie = `${COOKIE_KEYS.TOKEN}=${encodeURIComponent(token)}; ${options}`
}

export const clearAuthCookies = () => {
  const options = cookieOptions(0)
  Object.values(COOKIE_KEYS).forEach((key) => {
    document.cookie = `${key}=; ${options}`
  })
  window.dispatchEvent(new Event("lms-auth-change"))
}

export const readAuthSession = () => {
  const token = readCookie(COOKIE_KEYS.TOKEN)
  const authenticated = readCookie(COOKIE_KEYS.AUTHENTICATED) === "true"
  let user = null

  try {
    user = JSON.parse(readCookie(COOKIE_KEYS.USER) ?? "null")
  } catch {
    clearAuthCookies()
  }

  if (authenticated && token && user) return { user, token, isAuthenticated: true }

  const legacySession = readJSON(STORAGE_KEYS.SESSION)
  if (legacySession?.user && legacySession?.token) {
    writeAuthCookies(legacySession)
    removeKey(STORAGE_KEYS.SESSION)
    return { ...legacySession, isAuthenticated: true }
  }

  return { user: null, token: null, isAuthenticated: false }
}