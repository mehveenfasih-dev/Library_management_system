import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import BookTable from "../../components/books/BookTable";
import {
  setBooks,
  setLoading,
  setError,
} from "../../store/slices/bookSlice";
import {
  showNotification,
} from "../../store/slices/uiSlice";

import { getBooks } from "../../services/bookService";

const Books = () => {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(setLoading(true));

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

    fetchBooks();
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Books
      </Typography>

      <BookTable books={books} />
    </Box>
  );
};

export default Books;