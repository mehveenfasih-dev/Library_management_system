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

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const data = await getBookById(id);

        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <Typography>Loading book...</Typography>;
  }

  if (!book) {
    return (
      <Typography>
        Book not found.
      </Typography>
    );
  }

  return (
    <Paper
      sx={{
        p: 4,
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
          component="img"
          src={book.image}
          alt={book.title}
          sx={{
            width: 220,
            height: 320,
            objectFit: "cover",
            borderRadius: 1,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 280 }}>
          <Typography
            variant="h4"
            fontWeight={600}
            mb={2}
          >
            {book.title}
          </Typography>

          <Typography mb={1}>
            <strong>Author:</strong> {book.author}
          </Typography>

          <Typography mb={2}>
            <strong>Category:</strong> {book.category}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            {book.description}
          </Typography>

          <Button
            component={Link}
            to={ROUTES.BOOKS}
            variant="outlined"
            sx={{ mt: 3 }}
          >
            Back to Books
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BookDetails;