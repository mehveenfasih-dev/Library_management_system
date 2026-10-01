import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { clearAuthCookies, readAuthSession, writeAuthCookies } from "../utils/authCookies"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(readAuthSession)

  useEffect(() => {
    const syncSession = () => setSession(readAuthSession())
    window.addEventListener("lms-auth-change", syncSession)

    return () => window.removeEventListener("lms-auth-change", syncSession)
  }, [])

  const signIn = useCallback((nextSession) => {
    writeAuthCookies(nextSession)
    setSession({ ...nextSession, isAuthenticated: true })
  }, [])

  const signOut = useCallback(() => {
    clearAuthCookies()
    setSession({ user: null, token: null, isAuthenticated: false })
  }, [])

  const value = useMemo(
    () => ({
      user: session.user,
      token: session.token,
      isAuthenticated: session.isAuthenticated,
      isAdmin: session.user?.role === "admin",
      signIn,
      signOut,
    }),
    [session, signIn, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider