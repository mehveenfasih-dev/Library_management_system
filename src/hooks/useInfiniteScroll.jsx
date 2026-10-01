import { useCallback, useEffect, useState } from "react"

const useInfiniteScroll = (onLoadMore, enabled = true) => {
  const [node, setNode] = useState(null)
  const sentinelRef = useCallback((element) => setNode(element), [])

  useEffect(() => {
    if (!node || !enabled) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onLoadMore(),
      { rootMargin: "300px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, enabled, onLoadMore])

  return sentinelRef
}

export default useInfiniteScroll
