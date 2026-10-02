import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import EmptyState from "../../components/common/EmptyState"
import ErrorState from "../../components/common/ErrorState"
import PageHeader from "../../components/common/PageHeader"
import RequestTable from "../../components/requests/RequestTable"
import { fetchMyRequests, selectRequests } from "../../store/slices/requestSlice"
import { useAuth } from "../../providers/AuthProvider"

const MyRequests = () => {
	const dispatch = useDispatch()
	const { user } = useAuth()
	const { requests, status, error } = useSelector(selectRequests)
	const load = useCallback(() => dispatch(fetchMyRequests(user.id)), [dispatch, user.id])

	useEffect(() => {
		const request = load()
		return () => request.abort()
	}, [load])

	let content
	if (status === "failed") {
		content = <ErrorState title="Could not load requests" message={error} onRetry={load} />
	} else if (status === "loading" || status === "idle") {
		content = <RequestTable requests={[]} />
	} else if (!requests.length) {
		content = <EmptyState title="No borrow requests yet" message="Requests you make from a book page will appear here." />
	} else {
		content = <RequestTable requests={requests} />
	}

	return (
		<>
			<PageHeader title="My requests" subtitle="Track the status of books you have requested." />
			{content}
		</>
	)
}

export default MyRequests
