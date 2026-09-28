import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getBookById } from "../../services/bookService";
import { ROUTES } from "../../routes/routeConstants";

import BookDetailsSkeleton from "../../components/books/BooksDetailSkeleton";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");
        setBook(null);
        setImageError(false);

        const data = await getBookById(id);

        setBook(data);
      } catch (error) {
        console.error("BOOK DETAILS ERROR:", error);

        setError(
          error.message || "Failed to load book details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <BookDetailsSkeleton />;
  }

  

  if (error) {
    return (
      <Paper
        sx={{
          p: 4,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          mb={1}
        >
          Something went wrong
        </Typography>

        <Typography
          color="text.secondary"
          mb={3}
        >
          {error}
        </Typography>

        <Button
          component={Link}
          to={ROUTES.BOOKS}
          variant="outlined"
        >
          Back to Books
        </Button>
      </Paper>
    );
  }

  if (!book) {
    return (
      <Paper
        sx={{
          p: 4,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          mb={1}
        >
          Book not found
        </Typography>

        <Typography
          color="text.secondary"
          mb={3}
        >
          We couldn't find the requested book.
        </Typography>

        <Button
          component={Link}
          to={ROUTES.BOOKS}
          variant="outlined"
        >
          Back to Books
        </Button>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },

        border: "1px solid",
        borderColor: "divider",
      }}
    >

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
        }}
      >

        <Box
          sx={{
            width: {
              xs: "100%",
              sm: 220,
            },

            height: 320,

            flexShrink: 0,

            display: "flex",
            justifyContent: "center",
          }}
        >

          <Box
            component="img"
            src={
              imageError
                ? "https://via.placeholder.com/220x320?text=No+Cover"
                : book.image
            }
            alt={book.title}
            onError={() => setImageError(true)}
            sx={{
              width: 220,
              height: 320,
              objectFit: "cover",
              borderRadius: 1,
              display: "block",
            }}
          />

        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: {
              xs: "100%",
              sm: 280,
            },
          }}
        >

          <Typography
            variant="h4"
            fontWeight={600}
            mb={2}
          >
            {book.title}
          </Typography>

          <Typography mb={1}>
            <strong>Author:</strong>{" "}
            {book.author}
          </Typography>

          <Typography mb={2}>
            <strong>Category:</strong>{" "}
            {book.category}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
            }}
          >
            {book.description}
          </Typography>

          <Button
            component={Link}
            to={ROUTES.BOOKS}
            variant="outlined"
            sx={{
              mt: 3,
            }}
          >
            Back to Books
          </Button>

        </Box>

      </Box>

    </Paper>
  );
};

export default BookDetails;