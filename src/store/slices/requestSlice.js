import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBorrowRequest, getRequests, setBorrowRequestStatus } from "../../api/requestApi"

export const fetchMyRequests = createAsyncThunk("requests/fetchMine", (userId) => getRequests(userId))
export const fetchAllRequests = createAsyncThunk("requests/fetchAll", () => getRequests())
export const createRequest = createAsyncThunk("requests/create", (payload, { rejectWithValue }) =>
  createBorrowRequest(payload).catch((error) => rejectWithValue(error.message))
)
export const updateRequestStatus = createAsyncThunk(
  "requests/updateStatus",
  (payload, { rejectWithValue }) =>
    setBorrowRequestStatus(payload).catch((error) => rejectWithValue(error.message))
)

const fetchPending = (state) => {
  state.status = "loading"
  state.error = null
}

const fetchFulfilled = (state, action) => {
  state.requests = action.payload
  state.status = "succeeded"
}

const fetchRejected = (state, action) => {
  state.status = "failed"
  state.error = action.payload ?? "Failed to load requests."
}

const requestSlice = createSlice({
  name: "requests",
  initialState: { requests: [], status: "idle", error: null, creating: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRequests.pending, fetchPending)
      .addCase(fetchMyRequests.fulfilled, fetchFulfilled)
      .addCase(fetchMyRequests.rejected, fetchRejected)
      .addCase(fetchAllRequests.pending, fetchPending)
      .addCase(fetchAllRequests.fulfilled, fetchFulfilled)
      .addCase(fetchAllRequests.rejected, fetchRejected)
      .addCase(createRequest.pending, (state) => {
        state.creating = true
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.creating = false
        state.requests.unshift(action.payload)
      })
      .addCase(createRequest.rejected, (state) => {
        state.creating = false
      })
      .addCase(updateRequestStatus.pending, (state, action) => {
        const request = state.requests.find((item) => item.id === action.meta.arg.id)
        if (!request) return
        request.previousStatus = request.status
        request.status = action.meta.arg.status
        request.updating = true
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const request = state.requests.find((item) => item.id === action.payload.id)
        if (!request) return
        Object.assign(request, action.payload)
        delete request.previousStatus
        request.updating = false
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        const request = state.requests.find((item) => item.id === action.meta.arg.id)
        if (!request) return
        request.status = request.previousStatus
        delete request.previousStatus
        request.updating = false
        state.error = action.payload ?? "Could not update the request."
      })
  },
})

export const selectRequests = (state) => state.requests

export default requestSlice.reducer
