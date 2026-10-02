import { useMemo, useState } from "react"
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Stack,
  TextField,
} from "@mui/material"
import { Add, Search, Sort } from "@mui/icons-material"
import { useDispatch } from "react-redux"

import BookTable, { SKELETON_COLUMNS } from "../../components/books/BookTable"
import BookFormDialog from "../../components/books/BookFormDialog"
import ConfirmDialog from "../../components/common/ConfirmDialog"
import EmptyState from "../../components/common/EmptyState"
import ErrorState from "../../components/common/ErrorState"
import PageHeader from "../../components/common/PageHeader"
import TableSkeleton from "../../components/common/TableSkeleton"

import useBooksPage from "../../hooks/useBooksPage"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"
import useDebounce from "../../hooks/useDebounce"
import { addBook, editBook, removeBook } from "../../store/slices/bookSlice"
import { SORT_OPTIONS } from "../../constants/app"
import { useLocale } from "../../providers/LocaleProvider"
import { useNotification } from "../../providers/NotificationProvider"

const HEADERS = ["Cover", "Title", "Author", "Category", "Copies", "Actions"]

const Books = () => {
  const dispatch = useDispatch()
  const { t } = useLocale()
  const { notify } = useNotification()

  const [searchInput, setSearchInput] = useState("")
  const [sort, setSort] = useState("relevance")
  const [order, setOrder] = useState("")
  const [formBook, setFormBook] = useState(undefined) // undefined = closed, null = new book
  const [bookToDelete, setBookToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const search = useDebounce(searchInput, 500).trim()
  const { books, total, status, error, loadMore, reload } = useBooksPage(search, sort)
  const [saving, setSaving] = useState(false)
  const hasMore = books.length < total
  const sentinelRef = useInfiniteScroll(loadMore, hasMore && status === "succeeded")

  const displayBooks = useMemo(() => {
    if (!order) return books

    const sorted = [...books].sort((a, b) => a.title.localeCompare(b.title))
    return order === "asc" ? sorted : sorted.reverse()
  }, [books, order])

  const toggleOrder = () => setOrder((prev) => (prev === "asc" ? "desc" : "asc"))

  const handleSave = async (values) => {
    setSaving(true)

    try {
      if (formBook) {
        await dispatch(editBook({ id: formBook.id, changes: values })).unwrap()
        notify("Book updated.")
      } else {
        await dispatch(addBook(values)).unwrap()
        notify("Book added.")
        reload()
      }

      setFormBook(undefined)
    } catch {
      notify("Could not save the book.", "error")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)

    try {
      await dispatch(removeBook(bookToDelete.id)).unwrap()
      notify("Book deleted.")
      reload()
      setBookToDelete(null)
    } catch {
      notify("Could not delete the book.", "error")
    } finally {
      setDeleting(false)
    }
  }

  const isLoading = (status === "loading" || status === "idle") && books.length === 0

  const renderBody = () => {
    if (isLoading) {
      return (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                {HEADERS.map((label) => (
                  <TableCell key={label}>{label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableSkeleton columns={SKELETON_COLUMNS} rows={8} />
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    if (status === "failed" && books.length === 0) {
      return <ErrorState title="Could not load books" message={error} onRetry={reload} />
    }

    if (books.length === 0) {
      return <EmptyState title="No books found" message="Try a different search or add a new book." />
    }

    return (
      <>
        <BookTable
          books={displayBooks}
          order={order}
          onToggleOrder={toggleOrder}
          loadingMore={status === "loading" && books.length > 0}
          onEdit={setFormBook}
          onDelete={setBookToDelete}
        />
        {status === "failed" && (
          <ErrorState title="Could not load more books" message={error} onRetry={loadMore} />
        )}
        {hasMore && <Box ref={sentinelRef} sx={{ height: 1 }} aria-hidden="true" />}
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Books"
        subtitle="Manage the library collection."
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => setFormBook(null)}>
            {t("Add book")}
          </Button>
        }
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t("Search books")}
          sx={{ maxWidth: 520, "& .MuiOutlinedInput-root": { backgroundColor: "background.paper" } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ width: { xs: "100%", sm: 220 } }}>
          <InputLabel id="books-sort-label">{t("Sort by")}</InputLabel>
          <Select
            labelId="books-sort-label"
            label={t("Sort by")}
            value={sort}
            startAdornment={
              <InputAdornment position="start">
                <Sort fontSize="small" />
              </InputAdornment>
            }
            onChange={(event) => setSort(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.label)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {renderBody()}

      {formBook !== undefined && (
        <BookFormDialog
          book={formBook}
          saving={saving}
          onSubmit={handleSave}
          onClose={() => setFormBook(undefined)}
        />
      )}

      <ConfirmDialog
        open={Boolean(bookToDelete)}
        title="Delete book"
        message={`${t("Delete")} "${bookToDelete?.title ?? ""}"? ${t("This cannot be undone.")}`}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setBookToDelete(null)}
      />
    </>
  )
}

export default Books
