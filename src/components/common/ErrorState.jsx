
import { Box, Button, Typography } from "@mui/material";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
}) => {
  return (
    <Box
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
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        mt={1}
      >
        {message}
      </Typography>

      {onRetry && (
        <Button
          variant="contained"
          onClick={onRetry}
          sx={{ mt: 3 }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorState;