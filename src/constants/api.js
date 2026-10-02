export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  USERS: "/users",
  BOOKS: "/books",
}

export const buildApiPath = {
  bookById: (id) => `${API_ENDPOINTS.BOOKS}/${id}`,
  relatedBooks: (bookId) => `${API_ENDPOINTS.BOOKS}/${bookId}/related`,
  userStatus: (id) => `${API_ENDPOINTS.USERS}/${id}/status`,
}
