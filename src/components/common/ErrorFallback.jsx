import { Box, Button, Typography } from "@mui/material"
import PropTypes from "prop-types"

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <Box sx={{ py: 10, px: 2, textAlign: "center" }}>
    <Typography variant="h5" fontWeight={700}>
      Something broke on this page
    </Typography>

    <Typography color="text.secondary" mt={1} mb={3}>
      {error?.message || "An unexpected error occurred."}
    </Typography>

    <Button variant="contained" onClick={resetErrorBoundary}>
      Try again
    </Button>
  </Box>
)

ErrorFallback.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string }),
  resetErrorBoundary: PropTypes.func.isRequired,
}

export default ErrorFallback
