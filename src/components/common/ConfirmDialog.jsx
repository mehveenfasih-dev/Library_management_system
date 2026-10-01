import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import PropTypes from "prop-types"
import { useLocale } from "../../providers/LocaleProvider"

const ConfirmDialog = ({ open, title, message, confirmLabel = "Confirm", loading, onConfirm, onClose }) => {
  const { t } = useLocale()

  return <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>{t(title)}</DialogTitle>
    <DialogContent>
      <DialogContentText>{t(message)}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button onClick={onClose} disabled={loading}>
        {t("Cancel")}
      </Button>
      <Button color="error" variant="contained" onClick={onConfirm} disabled={loading}>
        {t(confirmLabel)}
      </Button>
    </DialogActions>
  </Dialog>
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  loading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ConfirmDialog
