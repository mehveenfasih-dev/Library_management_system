import PropTypes from "prop-types"
import EmptyState from "./EmptyState"
import PageHeader from "./PageHeader"

const ComingSoon = ({ title }) => (
  <>
    <PageHeader title={title} />
    <EmptyState title="Coming soon" message={`The ${title.toLowerCase()} page is not built yet.`} />
  </>
)

ComingSoon.propTypes = { title: PropTypes.string.isRequired }

export default ComingSoon
