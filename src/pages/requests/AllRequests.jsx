import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import EmptyState from "../../components/common/EmptyState"
import ErrorState from "../../components/common/ErrorState"
import PageHeader from "../../components/common/PageHeader"
import RequestTable from "../../components/requests/RequestTable"
import { fetchAllRequests, selectRequests, updateRequestStatus } from "../../store/slices/requestSlice"
import { useLocale } from "../../providers/LocaleProvider"
import { useNotification } from "../../providers/NotificationProvider"

const AllRequests = () => {
	const dispatch = useDispatch()
	const { t } = useLocale()
	const { notify } = useNotification()
	const { requests, status, error } = useSelector(selectRequests)
	const load = useCallback(() => dispatch(fetchAllRequests()), [dispatch])

	useEffect(() => {
		const request = load()
		return () => request.abort()
	}, [load])

	const handleUpdateStatus = async (request, nextStatus) => {
		try {
			await dispatch(updateRequestStatus({ id: request.id, status: nextStatus })).unwrap()
			const message = {
				approved: "Request approved.",
				rejected: "Request rejected.",
				returned: "Request returned.",
			}[nextStatus]
			notify(t(message))
		} catch (updateError) {
			notify(updateError || "Could not update the request.", "error")
		}
	}

	let content
	if (status === "failed") {
		content = <ErrorState title="Could not load requests" message={error} onRetry={load} />
	} else if (status === "loading" || status === "idle") {
		content = <RequestTable requests={[]} isAdmin />
	} else if (!requests.length) {
		content = <EmptyState title="No borrow requests" message="Member requests will appear here." />
	} else {
		content = <RequestTable requests={requests} isAdmin onUpdateStatus={handleUpdateStatus} />
	}

	return (
		<>
			<PageHeader title="Book requests" subtitle="Review and manage member borrow requests." />
			{content}
		</>
	)
}

export default AllRequests
