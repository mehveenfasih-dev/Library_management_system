import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooksPage, resetBooksPage, selectBooksPage } from "../store/slices/bookSlice"

const useBooksPage = (search, sort) => {
  const dispatch = useDispatch()
  const state = useSelector(selectBooksPage)

  const reload = useCallback(() => {
    dispatch(resetBooksPage())
    return dispatch(fetchBooksPage({ search, sort, page: 1 }))
  }, [dispatch, search, sort])

  const loadMore = useCallback(() => {
    if (state.status === "loading" || state.items.length >= state.total) return undefined
    return dispatch(fetchBooksPage({ search, sort, page: state.page + 1 }))
  }, [dispatch, search, sort, state.items.length, state.page, state.status, state.total])

  useEffect(() => {
    const request = reload()

    return () => request.abort()
  }, [reload])

  return { ...state, loadMore, reload }
}

export default useBooksPage