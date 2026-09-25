import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",

  initialState,

  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },

    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setBooks,
  setSelectedBook,
  setLoading,
  setError,
} = bookSlice.actions;

export default bookSlice.reducer;