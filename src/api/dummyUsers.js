import { delay } from "../utils/delay"
import { readOverrides } from "./mock/usersDb"
import { env } from "../config/env"
import { API_ENDPOINTS } from "../constants/api"
import apiClient from "./axiosInstance"
import { MOCK_USERS } from "./mock/usersData"

const toMockUser = (user) => ({
  id: `d-${user.id}`,
  name: `${user.firstName} ${user.lastName}`.trim(),
  username: user.username,
  email: user.email,
  image: user.image,
  role: user.role === "admin" ? "admin" : "member",
  active: readOverrides()[`d-${user.id}`] !== false,
})

export const loginWithMockUser = async (identifier, password) => {
  if (!env.useMock) {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { identifier, password }, { skipLoader: true, skipToast: true })
    return { user: data.user, token: data.token ?? "cookie-session" }
  }

  await delay(300)
  const normalizedIdentifier = identifier.trim().toLowerCase()
  const found = MOCK_USERS.find(
    (user) =>
      (user.email.toLowerCase() === normalizedIdentifier || user.username.toLowerCase() === normalizedIdentifier) &&
      user.password === password
  )

  if (!found) throw new Error("Invalid email/username or password.")

  const user = toMockUser(found)
  if (!user.active) throw new Error("This account has been deactivated.")
  return { user, token: `mock-token-${found.id}` }
}

export const getMockUsers = async () => {
  await delay(200)
  return MOCK_USERS.map(toMockUser)
}