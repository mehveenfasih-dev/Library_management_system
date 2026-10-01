import { Box, Button, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { useLocale } from "../../providers/LocaleProvider"

const ErrorState = ({
  title = "Something went wrong",
  message = "We could not load the data. Please try again.",
  onRetry,
}) => {
  const { t } = useLocale()

  return <Box
    sx={{
      py: 8,
      px: 3,
      textAlign: "center",
      border: "1px solid",
      borderColor: "error.main",
      borderRadius: 2,
      backgroundColor: "background.paper",
    }}
  >
    <Typography variant="h6" fontWeight={600}>
      {t(title)}
    </Typography>

    <Typography color="text.secondary" mt={1}>
      {t(message)}
    </Typography>

    {onRetry && (
      <Button variant="contained" onClick={onRetry} sx={{ mt: 3 }}>
        {t("Try again")}
      </Button>
    )}
  </Box>
}

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
}

export default ErrorState
