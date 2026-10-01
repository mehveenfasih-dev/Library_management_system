import { memo } from "react"
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material"
import { DeleteOutlined, EditOutlined } from "@mui/icons-material"
import PropTypes from "prop-types"

import BookCover from "./BookCover"
import { bookShape } from "./bookPropTypes"
import TableSkeleton from "../common/TableSkeleton"
import { useLocale } from "../../providers/LocaleProvider"

const BookRow = memo(({ book, onEdit, onDelete, t }) => (
  <TableRow hover>
    <TableCell width={80}>
      <BookCover src={book.image} alt={book.title} sx={{ width: 44, height: 60, borderRadius: 1 }} />
    </TableCell>
    <TableCell sx={{ maxWidth: 280 }}>{book.title}</TableCell>
    <TableCell sx={{ maxWidth: 200 }}>{book.author}</TableCell>
    <TableCell>{book.category}</TableCell>
    <TableCell align="center">{book.copies}</TableCell>
    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
      <Tooltip title={t("Edit book")}>
        <IconButton onClick={() => onEdit(book)} aria-label={`${t("Edit book")}: ${book.title}`}>
          <EditOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("Delete book")}>
        <IconButton color="error" onClick={() => onDelete(book)} aria-label={`${t("Delete book")}: ${book.title}`}>
          <DeleteOutlined />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
))

BookRow.displayName = "BookRow"
BookRow.propTypes = {
  book: bookShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

const SKELETON_COLUMNS = [44, "80%", "60%", 80, 30, 70]

const BookTable = ({ books, order, onToggleOrder, loadingMore, onEdit, onDelete }) => {
  const { t } = useLocale()

  return <TableContainer component={Paper} variant="outlined">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t("Cover")}</TableCell>
          <TableCell sortDirection={order}>
            <TableSortLabel active={Boolean(order)} direction={order || "asc"} onClick={onToggleOrder}>
              {t("Title")}
            </TableSortLabel>
          </TableCell>
          <TableCell>{t("Author")}</TableCell>
          <TableCell>{t("Category")}</TableCell>
          <TableCell align="center">{t("Copies")}</TableCell>
          <TableCell align="right">{t("Actions")}</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {books.map((book) => (
          <BookRow key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} t={t} />
        ))}
        {loadingMore && <TableSkeleton columns={SKELETON_COLUMNS} rows={3} />}
      </TableBody>
    </Table>
  </TableContainer>
}

BookTable.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  order: PropTypes.oneOf(["asc", "desc", ""]).isRequired,
  onToggleOrder: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export { SKELETON_COLUMNS }
export default BookTable
