import { delay } from "../utils/delay"
import { readOverrides, readUsers, toPublicUser, writeOverrides, writeUsers } from "./mock/usersDb"
import { getMockUsers } from "./dummyUsers"
import { env } from "../config/env"
import { API_ENDPOINTS, buildApiPath } from "../constants/api"
import apiClient from "./axiosInstance"

const getEveryUser = async () => {
  if (!env.useMock) return null
  const mockUsers = await getMockUsers()
  const local = readUsers().map(toPublicUser)
  return [...local, ...mockUsers]
}

export const getUsers = async ({ search = "", role = "", page = 1, limit = 8 } = {}) => {
  if (!env.useMock) {
    const { data } = await apiClient.get(API_ENDPOINTS.USERS, { params: { search, role, page, limit } })
    return { items: (data.items ?? []).map(toPublicUser), total: data.total ?? 0 }
  }

  const term = search.trim().toLowerCase()

  const filtered = (await getEveryUser()).filter((user) => {
    const matchesSearch =
      !term || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    const matchesRole = !role || user.role === role
    return matchesSearch && matchesRole
  })

  const start = (page - 1) * limit
  return { items: filtered.slice(start, start + limit), total: filtered.length }
}

export const updateUserStatus = async (id, active) => {
  if (!env.useMock) {
    const { data } = await apiClient.patch(buildApiPath.userStatus(id), { active })
    return data
  }

  await delay(300)

  if (id.startsWith("u-")) {
    const users = readUsers()
    if (!users.some((u) => u.id === id)) throw new Error("User not found.")
    writeUsers(users.map((u) => (u.id === id ? { ...u, active } : u)))
  } else {
    writeOverrides({ ...readOverrides(), [id]: active })
  }

  return { id, active }
}