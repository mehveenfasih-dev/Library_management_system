import { Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import PropTypes from "prop-types"
import { useLocale } from "../../providers/LocaleProvider"

const requestShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  bookTitle: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  requestedAt: PropTypes.string.isRequired,
  dueAt: PropTypes.string,
})

const statusColor = {
  pending: "warning",
  approved: "success",
  returned: "default",
  overdue: "error",
  rejected: "default",
}

const formatDate = (value, locale) =>
  value
    ? new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", { dateStyle: "medium" }).format(new Date(value))
    : "—"

const RequestTable = ({ requests, isAdmin = false, onUpdateStatus }) => {
  const { locale, t } = useLocale()
  const headers = ["Book", ...(isAdmin ? ["Member"] : []), "Requested", "Due date", "Status", ...(isAdmin ? ["Actions"] : [])]

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1, boxShadow: "none", overflowX: "auto" }}>
      <Table sx={{ minWidth: isAdmin ? 860 : 620 }}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                align={header === "Actions" ? "right" : "left"}
                sx={{
                  py: 2,
                  px: 2.5,
                  bgcolor: "action.hover",
                  color: "text.secondary",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  ...(header === "Actions" && { width: 200 }),
                }}
              >
                {t(header)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} hover>
              <TableCell sx={{ py: 2.5, px: 2.5, minWidth: 180, fontWeight: 600 }}>{request.bookTitle}</TableCell>
              {isAdmin && (
                <TableCell sx={{ py: 2.5, px: 2.5, minWidth: 180 }}>
                  <Stack>
                    <span>{request.userName}</span>
                    <span style={{ color: "var(--mui-palette-text-secondary)", fontSize: "0.8rem" }}>{request.userEmail}</span>
                  </Stack>
                </TableCell>
              )}
              <TableCell sx={{ py: 2.5, px: 2.5, whiteSpace: "nowrap" }}>{formatDate(request.requestedAt, locale)}</TableCell>
              <TableCell sx={{ py: 2.5, px: 2.5, whiteSpace: "nowrap" }}>{formatDate(request.dueAt, locale)}</TableCell>
              <TableCell sx={{ py: 2.5, px: 2.5 }}>
                <Chip
                  size="small"
                  label={t(request.status.charAt(0).toUpperCase() + request.status.slice(1))}
                  color={statusColor[request.status] ?? "default"}
                  variant={request.status === "pending" ? "outlined" : "filled"}
                />
              </TableCell>
              {isAdmin && (
                <TableCell align="right" sx={{ py: 2.5, px: 2.5, width: 200, whiteSpace: "nowrap" }}>
                  {request.status === "pending" && (
                    <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center" sx={{ width: "100%" }}>
                      <Button
                     
                        size="small"
                     
                        disabled={request.updating}
                        onClick={() => onUpdateStatus(request, "approved")}
                        sx={{ minWidth: 84 ,color: "success.main", borderColor: "success.main", "&:hover": { bgcolor: "success.main", color: "common.white" } }}
                       

                      >
                        {t("Approve")}
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        disabled={request.updating}
                        onClick={() => onUpdateStatus(request, "rejected")}
                        sx={{ minWidth: 84, color: "error.main", borderColor: "error.main", "&:hover": { bgcolor: "error.main", color: "common.white" } }}
                      >
                        {t("Reject")}
                      </Button>
                    </Stack>
                  )}
                  {["approved", "overdue"].includes(request.status) && (
                    <Button
                      size="small"
                      disabled={request.updating}
                      onClick={() => onUpdateStatus(request, "returned")}
                    >
                      {t("Mark returned")}
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

RequestTable.propTypes = {
  requests: PropTypes.arrayOf(requestShape).isRequired,
  isAdmin: PropTypes.bool,
  onUpdateStatus: PropTypes.func,
}

export default RequestTable