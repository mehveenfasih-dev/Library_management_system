import { env } from "../config/env"
import { API_ENDPOINTS } from "../constants/api"
import { delay } from "../utils/delay"
import { readUsers, toPublicUser, writeUsers } from "./mock/usersDb"
import { loginWithMockUser } from "./dummyUsers"

export const loginRequest = async ({ email, password }) => {
  const identifier = email.trim()

  const local = readUsers().find(
    (u) => u.email.toLowerCase() === identifier.toLowerCase() && u.password === password
  )

  if (local) {
    if (!local.active) throw new Error("This account has been deactivated.")
    return { user: toPublicUser(local), token: `local-token-${local.id}` }
  }

  return loginWithMockUser(identifier, password)
}

export const registerRequest = async (data) => {
  if (!env.useMock) {
    const { data: user } = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data)
    return user
  }

  await delay(500)

  const users = readUsers()

  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error("An account with this email already exists.")
  }

  const { confirmPassword, ...fields } = data // eslint-disable-line no-unused-vars
  const user = { ...fields, id: `u-${Date.now()}`, role: "admin", active: true }

  writeUsers([...users, user])
  return toPublicUser(user)
}