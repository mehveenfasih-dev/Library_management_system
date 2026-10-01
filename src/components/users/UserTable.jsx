import { memo } from "react"
import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import PropTypes from "prop-types"

import TableSkeleton from "../common/TableSkeleton"
import { useLocale } from "../../providers/LocaleProvider"

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
})

const UserRow = memo(({ user, isSelf, onToggle, t }) => (
  <TableRow hover>
    <TableCell>{user.name}</TableCell>
    <TableCell sx={{ whiteSpace: "nowrap" }}>{user.email}</TableCell>
    <TableCell>
      <Chip
        size="small"
        label={t(user.role === "admin" ? "Admin" : "Member")}
        color={user.role === "admin" ? "primary" : "default"}
        sx={{ textTransform: "capitalize" }}
      />
    </TableCell>
    <TableCell>
      <Chip
        size="small"
        label={t(user.active ? "Active" : "Inactive")}
        color={user.active ? "success" : "error"}
        variant="outlined"
      />
    </TableCell>
    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
      <Button
        size="small"
        color={user.active ? "error" : "success"}
        disabled={isSelf}
        onClick={() => onToggle(user)}
        sx={{ textTransform: "none" }}
      >
        {t(user.active ? "Deactivate" : "Activate")}
      </Button>
    </TableCell>
  </TableRow>
))

UserRow.displayName = "UserRow"
UserRow.propTypes = {
  user: userShape.isRequired,
  isSelf: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

const HEADERS = ["Name", "Email", "Role", "Status", "Actions"]

const UserTable = ({ users, loading, currentUserId, onToggle }) => {
  const { t } = useLocale()

  return <TableContainer
    component={Paper}
    variant="outlined"
    sx={{
      borderRadius: 1,
      boxShadow: "none",
      "& .MuiTableCell-root": { px: 3, py: 2.5 },
      "& .MuiTableHead .MuiTableCell-root": {
        backgroundColor: "action.hover",
        color: "text.secondary",
        fontWeight: 700,
        whiteSpace: "nowrap",
      },
      "& .MuiTableBody .MuiTableRow:last-child .MuiTableCell-root": { borderBottom: 0 },
    }}
  >
    <Table sx={{ minWidth: 760 }}>
      <TableHead>
        <TableRow>
          {HEADERS.map((label) => (
            <TableCell key={label} align={label === "Actions" ? "right" : "left"}>
              {t(label)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {loading ? (
          <TableSkeleton columns={["60%", "70%", 70, 70, 90]} rows={6} />
        ) : (
          users.map((user) => (
            <UserRow key={user.id} user={user} isSelf={user.id === currentUserId} onToggle={onToggle} t={t} />
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(userShape).isRequired,
  loading: PropTypes.bool,
  currentUserId: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
}

export default UserTable
