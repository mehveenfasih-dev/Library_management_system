import {
  Box,
  Typography,
} from "@mui/material";
import { useLocale } from "../../providers/LocaleProvider"

const Footer = () => {
  const { t } = useLocale()

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        px: 3,
        py: 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
      >
        © Library System
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {t("About")}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {t("Help")}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {t("Contact")}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        v1.0
      </Typography>
    </Box>
  );
};

export default Footer;