import { Grid } from "@mui/material"
import PropTypes from "prop-types"
import BookCard from "./BookCard"
import BookCardSkeleton from "./BookCardSkeleton"
import { bookShape } from "./bookPropTypes"

const cellSize = { xs: 12, sm: 6, md: 4, lg: 3 }

export const BookGrid = ({ books }) => (
  <Grid container spacing={3}>
    {books.map((book) => (
      <Grid key={book.id} size={cellSize}>
        <BookCard book={book} />
      </Grid>
    ))}
  </Grid>
)

BookGrid.propTypes = { books: PropTypes.arrayOf(bookShape).isRequired }

export const BookGridSkeleton = ({ count = 12 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }, (_, index) => (
      <Grid key={index} size={cellSize}>
        <BookCardSkeleton />
      </Grid>
    ))}
  </Grid>
)

BookGridSkeleton.propTypes = { count: PropTypes.number }
