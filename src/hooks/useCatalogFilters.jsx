import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

// The URL is the single source of truth for catalog filters.
const useCatalogFilters = () => {
  const [params, setParams] = useSearchParams()

  const filters = useMemo(
    () => ({
      search: params.get("search") ?? "",
      category: params.get("category") ?? "",
      sort: params.get("sort") ?? "relevance",
      availableOnly: params.get("available") === "true",
      page: Math.max(Number(params.get("page")) || 1, 1),
    }),
    [params]
  )

  const isEmptyValue = (key, value) =>
    value === "" ||
    value === false ||
    value === null || value === undefined ||
    (key === "page" && value === 1) ||
    (key === "sort" && value === "relevance")

  // update({ category: "Fiction" }) changes one or more URL params and resets the page.
  const update = useCallback(
    (changes) => {
      setParams(
        (previous) => {
          const next = new URLSearchParams(previous)

          Object.entries(changes).forEach(([key, value]) => {
            if (isEmptyValue(key, value)) next.delete(key)
            else next.set(key, String(value))
          })

          if (!("page" in changes)) next.delete("page")
          return next
        },
        { replace: true }
      )
    },
    [setParams]
  )

  const clear = useCallback(() => setParams({}, { replace: true }), [setParams])

  return { filters, update, clear }
}

export default useCatalogFilters
