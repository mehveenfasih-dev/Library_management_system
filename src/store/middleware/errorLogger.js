

export const errorLogger = () => (next) => (action) => {
  const isFailure = action.type.endsWith("/rejected") && !action.meta?.aborted

  if (import.meta.env.DEV && isFailure) {
   
    console.warn(`[redux] ${action.type}`, action.payload ?? action.error?.message)
  }

  return next(action)
}
