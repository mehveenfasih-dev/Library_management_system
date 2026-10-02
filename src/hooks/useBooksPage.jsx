import { useCallback, useEffect, useState } from "react"
import { getBooks } from "../api/bookApi"
import { BOOKS_PAGE_SIZE } from "../constants/app"

const initialState = {
  books: [],
  total: 0,
  page: 0,
  status: "idle",
  error: null,
}

const useBooksPage = (search, sort) => {
  const [state, setState] = useState(initialState)

  const reload = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "loading", error: null }))

    try {
      const payload = await getBooks({
        search,
        sort,
        startIndex: 0,
        limit: BOOKS_PAGE_SIZE,
      })

      setState({
        books: payload.items,
        total: payload.total,
        page: 1,
        status: "succeeded",
        error: null,
      })

      return payload
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "failed",
        error: error.message || "Failed to load books.",
      }))
      return null
    }
  }, [search, sort])

  const loadMore = useCallback(async () => {
    if (state.status === "loading" || state.books.length >= state.total) return undefined

    const nextPage = state.page + 1

    setState((prev) => ({ ...prev, status: "loading", error: null }))

    try {
      const payload = await getBooks({
        search,
        sort,
        startIndex: (nextPage - 1) * BOOKS_PAGE_SIZE,
        limit: BOOKS_PAGE_SIZE,
      })

      setState((prev) => ({
        ...prev,
        books: [...prev.books, ...payload.items],
        total: payload.total,
        page: nextPage,
        status: "succeeded",
        error: null,
      }))

      return payload
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "failed",
        error: error.message || "Could not load more books.",
      }))
      return null
    }
  }, [search, sort, state.books.length, state.page, state.status, state.total])

  useEffect(() => {
    reload()
  }, [reload])

  return { ...state, loadMore, reload }
}

export default useBooksPage