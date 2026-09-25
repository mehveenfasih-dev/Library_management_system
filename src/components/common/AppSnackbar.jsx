
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { hideNotification } from "../../store/slices/uiSlice";

const AppSnackbar = () => {
  const dispatch = useDispatch();

  const notification = useSelector(
    (state) => state.ui.notification
  );

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        severity={notification.severity}
        onClose={handleClose}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
