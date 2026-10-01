import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { NOTIFICATION_EVENT } from "../utils/notifications"

const NotificationContext = createContext(null)

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" })

  const notify = useCallback((message, severity = "success") => {
    setNotification({ open: true, message, severity })
  }, [])

  const dismiss = useCallback(() => {
    setNotification((current) => ({ ...current, open: false }))
  }, [])

  useEffect(() => {
    const handleNotification = (event) => {
      const { message, severity } = event.detail
      notify(message, severity)
    }

    window.addEventListener(NOTIFICATION_EVENT, handleNotification)
    return () => window.removeEventListener(NOTIFICATION_EVENT, handleNotification)
  }, [notify])

  const value = useMemo(() => ({ notification, notify, dismiss }), [notification, notify, dismiss])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error("useNotification must be used within a NotificationProvider")
  return context
}

export default NotificationProvider