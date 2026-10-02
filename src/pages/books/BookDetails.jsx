import { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material"
import { MenuBook } from "@mui/icons-material"
import { Link as RouterLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import BookCover from "../../components/books/BookCover"
import BookDetailsSkeleton from "../../components/books/BooksDetailSkeleton"
import { BookGrid } from "../../components/books/BookGrid"
import ErrorState from "../../components/common/ErrorState"

import { getBookById, getRelatedBooks } from "../../api/bookApi"
import { createRequest, fetchMyRequests } from "../../store/slices/requestSlice"
import { useLocale } from "../../providers/LocaleProvider"
import { useAuth } from "../../providers/AuthProvider"
import { useNotification } from "../../providers/NotificationProvider"
import { ROUTES } from "../../routes/routeConstants"

const Meta = ({ label, value }) => {
  const { t } = useLocale()

  return <Box>
    <Typography variant="caption" color="text.secondary">
      {t(label)}
    </Typography>
    <Typography fontWeight={500}>{value}</Typography>
  </Box>
}

Meta.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

const BookDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { t } = useLocale()
  const { isAuthenticated, user } = useAuth()
  const { notify } = useNotification()
  const creatingRequest = useSelector((state) => state.requests.creating)
  const userRequests = useSelector((state) => state.requests.requests)
  const [book, setBook] = useState(null)
  const [related, setRelated] = useState([])
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  const hasActiveRequestForBook =
    isAuthenticated &&
    user?.id &&
    book &&
    userRequests.some(
      (request) =>
        request.userId === user.id &&
        request.bookId === book.id &&
        ["pending", "approved", "overdue"].includes(request.status)
    )

  const load = useCallback(async () => {
    setStatus("loading")
    setError(null)

    try {
      const nextBook = await getBookById(id)
      setBook(nextBook)

      try {
        const relatedBooks = await getRelatedBooks(nextBook)
        setRelated(relatedBooks)
      } catch {
        setRelated([])
      }

      setStatus("succeeded")
    } catch (loadError) {
      setStatus("failed")
      setError(loadError.message || "Failed to load the book.")
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return undefined

    const request = dispatch(fetchMyRequests(user.id))
    return () => request.abort()
  }, [dispatch, isAuthenticated, user?.id])

  const handleBorrow = async () => {
    if (!book?.available || hasActiveRequestForBook) return
    try {
      await dispatch(createRequest({ book, user })).unwrap()
      notify("Borrow request submitted.")
    } catch (error) {
      notify(error || "Could not submit the request.", "error")
    }
  }

  if (status === "loading" || status === "idle") return <BookDetailsSkeleton />

  if (status === "failed") {
    return <ErrorState title="Could not load this book" message={error} onRetry={load} />
  }

  return (
    <Box>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: "1px solid", borderColor: "divider" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Box sx={{ width: { xs: "100%", md: 280 }, flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <BookCover
              src={book.image}
              alt={book.title}
              sx={{ width: "100%", maxWidth: 280, height: 400, borderRadius: 2 }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {book.title}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {book.author}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", rowGap: 1 }}>
              <Chip label={t(book.category)} color="primary" variant="outlined" />
              <Chip
                label={book.available ? t("Available · {copies} copies").replace("{copies}", book.copies) : t("Unavailable")}
                color={book.available ? "success" : "error"}
              />
            </Stack>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" }, gap: 2, mb: 3 }}>
              <Meta label="Year" value={book.year} />
              <Meta label="ISBN" value={book.isbn} />
              <Meta label="Publisher" value={book.publisher} />
              <Meta label="Pages" value={book.pages ?? "N/A"} />
            </Box>

            <Typography variant="h6" fontWeight={600} gutterBottom>
              {t("Description")}
            </Typography>

            <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 4 }}>
              {book.description}
            </Typography>

            {isAuthenticated ? (
              user?.role !== "admin" && (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<MenuBook />}
                  disabled={!book.available || creatingRequest || hasActiveRequestForBook}
                  onClick={handleBorrow}
                  color={book.available ? "primary" : "inherit"}
                >
                  {!book.available
                    ? t("Currently unavailable")
                    : hasActiveRequestForBook
                      ? t("Already requested")
                      : creatingRequest
                        ? t("Submitting...")
                        : t("Request to borrow")}
                </Button>
              )
            ) : (
              <Button variant="contained" size="large" component={RouterLink} to={ROUTES.LOGIN}>
                {t("Sign in to borrow")}
              </Button>
            )}
          </Box>

        </Stack>
      </Paper>

      {related.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" fontWeight={600} mb={2}>
            {t("Related books")}
          </Typography>
          <BookGrid books={related} />
        </Box>
      )}
    </Box>
  )
}

export default BookDetails
