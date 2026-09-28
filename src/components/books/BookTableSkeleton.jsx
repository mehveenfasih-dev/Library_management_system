import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const BookTableSkeleton = ({ rows = 5 }) => {
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
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={80}
                />
              </TableCell>

              <TableCell>
                <Skeleton width="80%" />
              </TableCell>

              <TableCell>
                <Skeleton width="60%" />
              </TableCell>

              <TableCell>
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={36}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTableSkeleton;