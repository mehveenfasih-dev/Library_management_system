import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import BookTable from "../../components/books/BookTable";
import BookTableSkeleton from "../../components/books/BookTableSkeleton";

import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";

import {
  setBooks,
  setLoading,
  setError,
} from "../../store/slices/bookSlice";

import { showNotification } from "../../store/slices/uiSlice";

import { getBooks } from "../../services/bookService";


const Books = () => {
  const dispatch = useDispatch();

  const books = useSelector(
    (state) => state.books.books
  );

  const loading = useSelector(
    (state) => state.books.loading
  );

  const error = useSelector(
    (state) => state.books.error
  );


  const fetchBooks = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data = await getBooks();

      dispatch(setBooks(data));
    } catch (error) {
      dispatch(setError(error.message));

      dispatch(
        showNotification({
          message: error.message,
          severity: "error",
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };


  useEffect(() => {
    fetchBooks();
  }, []);


  return (
    <Box>
      <Typography
        variant="h4"
        mb={3}
      >
        Books
      </Typography>


      {loading ? (
        <BookTableSkeleton rows={5} />
      ) : error ? (
        <ErrorState
          title="Unable to Load Books"
          message={error}
          onRetry={fetchBooks}
        />
      ) : books.length === 0 ? (
        <EmptyState
          title="No Books Found"
          message="There are currently no books available."
        />
      ) : (
        <BookTable books={books} />
      )}
    </Box>
  );
};

export default Books;