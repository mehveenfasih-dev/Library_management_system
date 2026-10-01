import PropTypes from "prop-types"

export const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  copies: PropTypes.number,
  available: PropTypes.bool,
})
