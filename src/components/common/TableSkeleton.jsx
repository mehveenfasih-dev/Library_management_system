import { Skeleton, TableCell, TableRow } from "@mui/material"
import PropTypes from "prop-types"

// Only the body rows: place it inside an existing <TableBody>.
const TableSkeleton = ({ columns, rows = 5 }) =>
  Array.from({ length: rows }, (_, row) => (
    <TableRow key={row}>
      {columns.map((width, col) => (
        <TableCell key={col}>
          <Skeleton width={width} height={col === 0 ? 48 : 24} />
        </TableCell>
      ))}
    </TableRow>
  ))

TableSkeleton.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  rows: PropTypes.number,
}

export default TableSkeleton
