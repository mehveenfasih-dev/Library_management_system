import { InboxOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const EmptyState = ({
  title = "No Data Found",
  message = "There is nothing to display here.",
}) => {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        textAlign: "center",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <InboxOutlined
        sx={{
          fontSize: 56,
          color: "text.secondary",
          mb: 1,
        }}
      />

      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        mt={1}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;