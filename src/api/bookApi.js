import { STORAGE_KEYS } from "../constants/app"
import { delay } from "../utils/delay"
import { readJSON, removeKey, writeJSON } from "../utils/storage"
import { FALLBACK_COVER } from "../constants/images"
import { MOCK_BOOKS } from "./mock/booksData"
import { env } from "../config/env"
import apiClient from "./axiosInstance"
import { mapBook } from "./mappers/bookMapper"

const LEGACY_BOOKS_STORAGE_KEY = "lms_admin_books"

const readBooks = () => {
  const storedBooks = readJSON(STORAGE_KEYS.BOOKS)
  if (storedBooks) return storedBooks.map(mapBook)

  const legacyBooks = readJSON(LEGACY_BOOKS_STORAGE_KEY)
  if (legacyBooks) {
    writeJSON(STORAGE_KEYS.BOOKS, legacyBooks)
    removeKey(LEGACY_BOOKS_STORAGE_KEY)
    return legacyBooks.map(mapBook)
  }

  return MOCK_BOOKS.map(mapBook)
}

export const getBooks = async ({
  search = "",
  category = "",
  sort = "relevance",
  startIndex = 0,
  limit = 12,
  signal,
} = {}) => {
  if (!env.useMock) {
    const { data } = await apiClient.get("/books", {
      params: { search, category, sort, startIndex, limit },
      signal,
    })
    return { items: (data.items ?? []).map(mapBook), total: data.total ?? 0, startIndex }
  }

  await delay(300)

  const term = search.trim().toLowerCase()
  let list = readBooks().filter((book) => {
    const matchesSearch =
      !term || [book.title, book.author, book.category, book.description].some((value) => value.toLowerCase().includes(term))
    const matchesCategory = !category || book.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  if (sort === "newest") list = [...list].sort((a, b) => Number(b.year) - Number(a.year))

  return { items: list.slice(startIndex, startIndex + limit).map(mapBook), total: list.length, startIndex }
}

export const getBookById = async (id, { signal } = {}) => {
  if (!env.useMock) {
    const { data } = await apiClient.get(`/books/${id}`, { signal })
    return mapBook(data)
  }

  await delay(300)
  const found = readBooks().find((book) => book.id === id)
  if (!found) throw new Error("Book not found.")
  return found
}

export const getRelatedBooks = async (book, { signal } = {}) => {
  if (!env.useMock) {
    const { data } = await apiClient.get(`/books/${book.id}/related`, { signal })
    return (data.items ?? []).map(mapBook).slice(0, 4)
  }

  await delay(200)
  return readBooks().filter((item) => item.category === book.category && item.id !== book.id).slice(0, 4)
}

export const createBook = async (payload) => {
  if (!env.useMock) {
    const { data } = await apiClient.post("/books", payload)
    return mapBook(data)
  }

  await delay()
  const book = { ...payload, id: `local-${Date.now()}`, image: payload.image || FALLBACK_COVER }

  writeJSON(STORAGE_KEYS.BOOKS, [book, ...readBooks()])
  return book
}

export const updateBook = async (id, payload) => {
  if (!env.useMock) {
    const { data } = await apiClient.put(`/books/${id}`, payload)
    return mapBook(data)
  }

  await delay()
  const book = { ...payload, id, image: payload.image || FALLBACK_COVER }

  writeJSON(STORAGE_KEYS.BOOKS, readBooks().map((item) => (item.id === id ? book : item)))

  return book
}

export const deleteBook = async (id) => {
  if (!env.useMock) {
    await apiClient.delete(`/books/${id}`)
    return id
  }

  await delay()

  writeJSON(STORAGE_KEYS.BOOKS, readBooks().filter((book) => book.id !== id))

  return id
}