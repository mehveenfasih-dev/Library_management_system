import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { useLocale } from "../../providers/LocaleProvider"

const PageHeader = ({ title, subtitle, action }) => {
  const { t } = useLocale()

  return <Box
    sx={{
      display: "flex",
      alignItems: { xs: "flex-start", sm: "center" },
      justifyContent: "space-between",
      flexDirection: { xs: "column", sm: "row" },
      gap: 2,
      mb: 3,
    }}
  >
    <Box>
      <Typography variant="h4" fontWeight={700}>
        {t(title)}
      </Typography>
      {subtitle && (
        <Typography color="text.secondary" mt={0.5}>
          {t(subtitle)}
        </Typography>
      )}
    </Box>
    {action}
  </Box>
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.node,
}

export default PageHeader
