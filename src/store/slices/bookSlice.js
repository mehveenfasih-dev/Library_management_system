import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBook, deleteBook, getBooks, updateBook } from "../../api/bookApi"
import { CATALOG_PAGE_SIZE } from "../../constants/app"

export const fetchCatalog = createAsyncThunk(
  "books/fetchCatalog",
  async ({ search, category, sort, page }, { rejectWithValue, signal }) => {
    try {
      return await getBooks({
        search,
        category,
        sort,
        limit: CATALOG_PAGE_SIZE,
        startIndex: (page - 1) * CATALOG_PAGE_SIZE,
        signal,
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addBook = createAsyncThunk("books/create", (payload) => createBook(payload))
export const editBook = createAsyncThunk("books/update", ({ id, changes }) => updateBook(id, changes))
export const removeBook = createAsyncThunk("books/delete", (id) => deleteBook(id))

const initialState = {
  catalog: { books: [], total: 0, status: "idle", error: null },
}

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.catalog.status = "loading"
        state.catalog.error = null
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.catalog.books = action.payload.items
        state.catalog.total = action.payload.total
        state.catalog.status = "succeeded"
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.catalog.status = "failed"
        state.catalog.error = action.payload ?? "Failed to load books."
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.catalog.total += 1
        state.catalog.books = [action.payload, ...state.catalog.books]
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.catalog.books = state.catalog.books.map((book) =>
          book.id === action.payload.id ? { ...book, ...action.payload } : book
        )
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.catalog.books = state.catalog.books.filter((book) => book.id !== action.payload)
        state.catalog.total = Math.max(0, state.catalog.total - 1)
      })
  },
})

export const selectCatalog = (state) => state.books.catalog

export default bookSlice.reducer
