import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

import { ROUTES } from "../../routes/routeConstants";

const BookTable = ({ books }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
        
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
                <img
                  src={book.image}
                  alt={book.title}
                  width="60"
                  height="80"
                  style={{ objectFit: "cover" }}
                />
              </TableCell>

              <TableCell>{book.title}</TableCell>

              <TableCell>{book.author}</TableCell>

              

              <TableCell>
                <Button
                  component={Link}
                  to={ROUTES.BOOK_DETAILS.replace(
                    ":id",
                    book.id
                  )}
                  variant="contained"
                  size="small"
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;