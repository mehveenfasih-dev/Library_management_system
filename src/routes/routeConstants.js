export const ROUTES = {
  ROOT: "/",

  LOGIN: "/login",
  REGISTER: "/register",

  CATALOG: "/catalog",
  BOOK_DETAILS: "/books/:id",

  MY_REQUESTS: "/my-requests",
  PROFILE: "/profile",

  DASHBOARD: "/dashboard",
  BOOKS: "/books",
  USERS: "/users",
  ALL_REQUESTS: "/requests",
}

export const bookDetailsPath = (id) => `/books/${id}`
