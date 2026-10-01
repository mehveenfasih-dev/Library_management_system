import { memo } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material"

import BookCover from "./BookCover"
import { bookShape } from "./bookPropTypes"
import { bookDetailsPath } from "../../routes/routeConstants"
import { useLocale } from "../../providers/LocaleProvider"

const BookCard = ({ book }) => {
  const { t } = useLocale()

  return (
  <Card sx={{ height: "100%" }}>
    <CardActionArea
      component={RouterLink}
      to={bookDetailsPath(book.id)}
      sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
    >
      <BookCover src={book.image} alt={book.title} sx={{ width: "100%", height: 260 }} />

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ lineHeight: 1.3 }} noWrap title={book.title}>
          {book.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap mb={1.5}>
          {book.author}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip label={t(book.category)} size="small" sx={{ maxWidth: 140 }} />
          <Chip
              label={t(book.available ? "Available" : "Out")}
            size="small"
            color={book.available ? "success" : "error"}
            variant="outlined"
          />
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

BookCard.propTypes = { book: bookShape.isRequired }

export default memo(BookCard)
