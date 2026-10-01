import { InboxOutlined } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { useLocale } from "../../providers/LocaleProvider"

const EmptyState = ({
  title = "No data found",
  message = "There is nothing to display here.",
  actionLabel,
  onAction,
}) => {
  const { t } = useLocale()

  return <Box
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
    <InboxOutlined sx={{ fontSize: 56, color: "text.secondary", mb: 1 }} />

    <Typography variant="h6" fontWeight={600}>
      {t(title)}
    </Typography>

    <Typography color="text.secondary" mt={1}>
      {t(message)}
    </Typography>

    {onAction && (
      <Button variant="outlined" onClick={onAction} sx={{ mt: 3 }}>
        {t(actionLabel)}
      </Button>
    )}
  </Box>
}

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
}

export default EmptyState
