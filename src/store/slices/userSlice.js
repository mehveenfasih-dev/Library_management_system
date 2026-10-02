import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUsers, updateUserStatus } from "../../api/userApi"
import { USERS_PAGE_SIZE } from "../../constants/app"

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async ({ search, role, page }, { rejectWithValue }) => {
    try {
      return await getUsers({ search, role, page, limit: USERS_PAGE_SIZE })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Optimistic: the switch flips right away and rolls back if the request fails.
export const toggleUserStatus = createAsyncThunk(
  "users/toggleStatus",
  async ({ id, active }, { rejectWithValue }) => {
    try {
      return await updateUserStatus(id, active)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const setActive = (state, id, active) => {
  const user = state.users.find((item) => item.id === id)
  if (user) user.active = active
}

const userSlice = createSlice({
  name: "users",
  initialState: { users: [], total: 0, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.items
        state.total = action.payload.total
        state.status = "succeeded"
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload ?? "Failed to load users."
      })

      .addCase(toggleUserStatus.pending, (state, action) => {
        setActive(state, action.meta.arg.id, action.meta.arg.active)
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        setActive(state, action.meta.arg.id, !action.meta.arg.active)
      })
  },
})

export const selectUsers = (state) => state.users

export default userSlice.reducer
