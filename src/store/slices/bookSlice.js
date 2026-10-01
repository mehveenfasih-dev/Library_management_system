import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBook, deleteBook, getBookById, getBooks, getRelatedBooks, updateBook } from "../../api/bookApi"
import { BOOKS_PAGE_SIZE, CATALOG_PAGE_SIZE } from "../../constants/app"

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

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await getBookById(id, { signal })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchRelatedBooks = createAsyncThunk(
  "books/fetchRelatedBooks",
  async (book, { rejectWithValue, signal }) => {
    try {
      return await getRelatedBooks(book, { signal })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchBooksPage = createAsyncThunk(
  "books/fetchPage",
  async ({ search, page, sort = "relevance" }, { rejectWithValue, signal }) => {
    try {
      const startIndex = (page - 1) * BOOKS_PAGE_SIZE
      return await getBooks({ search, sort, startIndex, limit: BOOKS_PAGE_SIZE, signal })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addBook = createAsyncThunk("books/create", (payload) => createBook(payload))
export const editBook = createAsyncThunk("books/update", ({ id, changes }) => updateBook(id, changes))
export const removeBook = createAsyncThunk("books/delete", (id) => deleteBook(id))

const initialState = {
  catalog: { items: [], total: 0, status: "idle", error: null },
  detail: { book: null, status: "idle", error: null },
  related: { items: [], status: "idle" },
  paged: { items: [], search: "", sort: "relevance", page: 0, total: 0, status: "idle", error: null, saving: false },
}

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBookDetail: (state) => {
      state.detail = initialState.detail
      state.related = initialState.related
    },
    resetBooksPage: (state) => {
      state.paged = { ...initialState.paged }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.catalog.status = "loading"
        state.catalog.error = null
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.catalog.items = action.payload.items
        state.catalog.total = action.payload.total
        state.catalog.status = "succeeded"
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.catalog.status = "failed"
        state.catalog.error = action.payload ?? "Failed to load books."
      })

      .addCase(fetchBookById.pending, (state) => {
        state.detail = { book: null, status: "loading", error: null }
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.detail = { book: action.payload, status: "succeeded", error: null }
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.detail.status = "failed"
        state.detail.error = action.payload ?? "Failed to load the book."
      })

      .addCase(fetchRelatedBooks.pending, (state) => {
        state.related.status = "loading"
      })
      .addCase(fetchRelatedBooks.fulfilled, (state, action) => {
        state.related = { items: action.payload, status: "succeeded" }
      })
      .addCase(fetchRelatedBooks.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.related = { items: [], status: "failed" }
      })
      .addCase(fetchBooksPage.pending, (state, action) => {
        state.paged.search = action.meta.arg.search
        state.paged.sort = action.meta.arg.sort ?? "relevance"
        state.paged.status = "loading"
        state.paged.error = null
      })
      .addCase(fetchBooksPage.fulfilled, (state, action) => {
        if (
          action.meta.arg.search !== state.paged.search ||
          (action.meta.arg.sort ?? "relevance") !== state.paged.sort ||
          action.meta.arg.page !== state.paged.page + 1
        ) return
        state.paged.page = action.meta.arg.page
        state.paged.items = action.meta.arg.page === 1
          ? action.payload.items
          : [...state.paged.items, ...action.payload.items]
        state.paged.total = action.payload.total
        state.paged.status = "succeeded"
      })
      .addCase(fetchBooksPage.rejected, (state, action) => {
        if (
          action.meta.aborted ||
          action.meta.arg.search !== state.paged.search ||
          (action.meta.arg.sort ?? "relevance") !== state.paged.sort ||
          action.meta.arg.page !== state.paged.page + 1
        ) return
        state.paged.status = "failed"
        state.paged.error = action.payload ?? "Failed to load books."
      })
      .addCase(addBook.pending, (state) => {
        state.paged.saving = true
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.paged.saving = false
        state.paged.total += 1
        if (state.paged.page === 1) state.paged.items.unshift(action.payload)
      })
      .addCase(addBook.rejected, (state) => {
        state.paged.saving = false
      })
      .addCase(editBook.pending, (state) => {
        state.paged.saving = true
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.paged.saving = false
        state.paged.items = state.paged.items.map((book) =>
          book.id === action.payload.id ? { ...book, ...action.payload } : book
        )
      })
      .addCase(editBook.rejected, (state) => {
        state.paged.saving = false
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.paged.items = state.paged.items.filter((book) => book.id !== action.payload)
        state.paged.total = Math.max(0, state.paged.total - 1)
      })
  },
})

export const { clearBookDetail, resetBooksPage } = bookSlice.actions

export const selectCatalog = (state) => state.books.catalog
export const selectBookDetail = (state) => state.books.detail
export const selectRelatedBooks = (state) => state.books.related
export const selectBooksPage = (state) => state.books.paged

export default bookSlice.reducer
