import { STORAGE_KEYS } from "../constants/app"
import { delay } from "../utils/delay"
import { readJSON, writeJSON } from "../utils/storage"
import { toISOString, toISOStringAfterDays } from "../helpers/dateHelpers"

const readRequests = () => readJSON(STORAGE_KEYS.REQUESTS, []) ?? []
const writeRequests = (requests) => writeJSON(STORAGE_KEYS.REQUESTS, requests)

const withCurrentStatus = (request) => {
  if (request.status === "approved" && request.dueAt && new Date(request.dueAt) < new Date()) {
    return { ...request, status: "overdue" }
  }

  return request
}

export const getRequests = async (userId) => {
  await delay(250)
  const requests = readRequests().map(withCurrentStatus)
  return userId ? requests.filter((request) => request.userId === userId) : requests
}

export const createBorrowRequest = async ({ book, user }) => {
  await delay(250)
  const requests = readRequests()
  const existing = requests.find(
    (request) =>
      request.bookId === book.id &&
      request.userId === user.id &&
      ["pending", "approved", "overdue"].includes(withCurrentStatus(request).status)
  )

  if (existing) throw new Error("You already have an active request for this book.")

  const request = {
    id: `request-${Date.now()}`,
    bookId: book.id,
    bookTitle: book.title,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    status: "pending",
    requestedAt: toISOString(),
    dueAt: null,
  }

  writeRequests([request, ...requests])
  return request
}

export const setBorrowRequestStatus = async ({ id, status }) => {
  await delay(250)
  const requests = readRequests()
  const current = requests.find((request) => request.id === id)

  if (!current) throw new Error("Request not found.")

  const currentStatus = withCurrentStatus(current).status
  const allowed =
    (currentStatus === "pending" && ["approved", "rejected"].includes(status)) ||
    (["approved", "overdue"].includes(currentStatus) && status === "returned")

  if (!allowed) throw new Error("This request can no longer be updated.")

  const updated = {
    ...current,
    status,
    dueAt: status === "approved" ? toISOStringAfterDays(14) : current.dueAt,
    returnedAt: status === "returned" ? toISOString() : null,
  }

  writeRequests(requests.map((request) => (request.id === id ? updated : request)))
  return updated
}