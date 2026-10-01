export const STORAGE_KEYS = {
  SESSION: "lms_session",
  USERS: "lms_users",
  BOOKS: "lms_books",
  REQUESTS: "lms_borrow_requests",
  THEME: "lms_theme",
  LOCALE: "lms_locale",
}

export const CATALOG_PAGE_SIZE = 12
export const CATALOG_MAX_PAGES = 25
export const BOOKS_PAGE_SIZE = 20
export const USERS_PAGE_SIZE = 8

export const BOOK_CATEGORIES = [
  "Programming",
  "Computers",
  "Fiction",
  "Science",
  "History",
  "Business",
  "Art",
  "Philosophy",
]

export const SORT_OPTIONS = [
  { value: "relevance", label: "Most relevant" },
  { value: "newest", label: "Newest first" },
]

export const ROLES = { ADMIN: "admin", MEMBER: "member" }
