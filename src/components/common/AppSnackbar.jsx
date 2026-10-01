
import { Alert, Snackbar } from "@mui/material"

import { useLocale } from "../../providers/LocaleProvider"
import { useNotification } from "../../providers/NotificationProvider"

const AppSnackbar = () => {
  const { t } = useLocale()
  const { notification, dismiss } = useNotification()

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={4000}
      onClose={dismiss}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        severity={notification.severity}
        onClose={dismiss}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {t(notification.message)}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackbar
