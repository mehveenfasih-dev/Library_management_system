import { useCallback, useEffect, useMemo, useState } from "react"
import { Box, Chip, Pagination, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { BookGrid, BookGridSkeleton } from "../../components/books/BookGrid"
import CatalogSearchBar from "../../components/books/CatalogSearchBar"
import FilterPanel from "../../components/books/FilterPanel"
import EmptyState from "../../components/common/EmptyState"
import ErrorState from "../../components/common/ErrorState"
import PageHeader from "../../components/common/PageHeader"

import useCatalogFilters from "../../hooks/useCatalogFilters"
import useDebounce from "../../hooks/useDebounce"
import { useLocale } from "../../providers/LocaleProvider"
import { fetchCatalog, selectCatalog } from "../../store/slices/bookSlice"
import { CATALOG_MAX_PAGES, CATALOG_PAGE_SIZE, SORT_OPTIONS } from "../../constants/app"

const Catalog = () => {
  const dispatch = useDispatch()
  const { t } = useLocale()
  const { items, total, status, error } = useSelector(selectCatalog)
  const { filters, update, clear } = useCatalogFilters()

  const [searchInput, setSearchInput] = useState(filters.search)
  const debouncedSearch = useDebounce(searchInput, 500)

  const { search, category, sort, page, availableOnly } = filters

  useEffect(() => {
    const settled = debouncedSearch === searchInput
    if (settled && debouncedSearch.trim() !== search) update({ search: debouncedSearch.trim() })
  }, [debouncedSearch, searchInput, search, update])

  const load = useCallback(
    () => dispatch(fetchCatalog({ search, category, sort, page })),
    [dispatch, search, category, sort, page]
  )

  useEffect(() => {
    const request = load()
    return () => request.abort()
  }, [load])

  const books = useMemo(
    () => (availableOnly ? items.filter((book) => book.available) : items),
    [items, availableOnly]
  )

  const totalPages = Math.min(Math.ceil(total / CATALOG_PAGE_SIZE), CATALOG_MAX_PAGES)
  const handlePageChange = (_, value) => {
    update({ page: value })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleClearAll = () => {
    setSearchInput("")
    clear()
  }

  const sortLabel = t(SORT_OPTIONS.find((option) => option.value === sort)?.label)

  const renderResults = () => {
    if (status === "loading" || status === "idle") return <BookGridSkeleton count={CATALOG_PAGE_SIZE} />

    if (status === "failed") {
      return <ErrorState title="Could not load books" message={error} onRetry={load} />
    }

    if (books.length === 0) {
      return (
        <EmptyState
          title="No books match your filters"
          message="Try a different search or clear the filters."
          actionLabel="Clear filters"
          onAction={handleClearAll}
        />
      )
    }

    return <BookGrid books={books} />
  }

  return (
    <Box>
      <PageHeader title="Book catalog" subtitle="Browse the library and request what you want to read." />

      <Box sx={{ maxWidth: 900, mb: 2 }}>
        <CatalogSearchBar
          value={searchInput}
          onChange={setSearchInput}
        />
      </Box>

      <Box sx={{ maxWidth: 900 }}>
        <FilterPanel filters={filters} onChange={update} />
      </Box>

      {(category || sort !== "relevance" || availableOnly) && (
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", rowGap: 1 }}>
          {category && <Chip label={t(category)} onDelete={() => update({ category: "" })} />}
          {sort !== "relevance" && <Chip label={sortLabel} onDelete={() => update({ sort: "relevance" })} />}
          {availableOnly && <Chip label={t("Available only")} onDelete={() => update({ available: false })} />}
          <Chip label={t("Clear all")} variant="outlined" onClick={handleClearAll} />
        </Stack>
      )}

      {status === "succeeded" && books.length > 0 && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {t("Showing {shown} of about {total} books")
            .replace("{shown}", books.length)
            .replace("{total}", total.toLocaleString())}
        </Typography>
      )}

      {renderResults()}
{totalPages > 1 && (
  <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mt: 5, pb: 2 }}>
    <Pagination count={totalPages} page={page} color="primary" onChange={handlePageChange} />
  </Box>
)}
    </Box>
  )
}

export default Catalog
