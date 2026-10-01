export const NOTIFICATION_EVENT = "lms-notification"

export const emitNotification = (message, severity = "success") => {
  window.dispatchEvent(
    new CustomEvent(NOTIFICATION_EVENT, { detail: { message, severity } })
  )
}