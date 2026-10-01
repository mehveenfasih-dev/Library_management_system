import { useEffect, useState } from "react"
import { readJSON, writeJSON } from "../utils/storage"

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => readJSON(key, initialValue))

  useEffect(() => {
    writeJSON(key, value)
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
