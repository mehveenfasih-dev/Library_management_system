import { Box } from "@mui/material"
import PropTypes from "prop-types"
import { FALLBACK_COVER } from "../../constants/images"

const BookCover = ({ src, alt, sx }) => (
  <Box
    component="img"
    src={src || FALLBACK_COVER}
    alt={alt}
    loading="lazy"
    onError={(event) => {
      event.currentTarget.onerror = null
      event.currentTarget.src = FALLBACK_COVER
    }}
    sx={{ objectFit: "cover", display: "block", ...sx }}
  />
)

BookCover.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  sx: PropTypes.object,
}

export default BookCover
