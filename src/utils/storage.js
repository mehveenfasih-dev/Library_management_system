export const readJSON = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or blocked: the app keeps working without persistence
  }
}

export const removeKey = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
