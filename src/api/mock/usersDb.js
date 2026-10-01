// import { STORAGE_KEYS } from "../../constants/app"
// import { readJSON, writeJSON } from "../../utils/storage"

// const seedUsers = [
//   { id: "u-1", name: "Library Admin", email: "admin@library.com", password: "Admin@123", role: "admin", active: true },
//   { id: "u-2", name: "Demo Member", email: "member@library.com", password: "Member@123", role: "member", active: true },
//   { id: "u-3", name: "Ali Khan", email: "ali@example.com", password: "Member@123", role: "member", active: true },
//   { id: "u-4", name: "Sara Ahmed", email: "sara@example.com", password: "Member@123", role: "member", active: false },
//   { id: "u-5", name: "Hina Malik", email: "hina@example.com", password: "Member@123", role: "member", active: true },
//   { id: "u-6", name: "Usman Raza", email: "usman@example.com", password: "Member@123", role: "member", active: true },
//   { id: "u-7", name: "Ayesha Noor", email: "ayesha@example.com", password: "Member@123", role: "member", active: true },
//   { id: "u-8", name: "Bilal Sheikh", email: "bilal@example.com", password: "Member@123", role: "member", active: false },
//   { id: "u-9", name: "Zara Iqbal", email: "zara@example.com", password: "Member@123", role: "member", active: true },
// ]

// export const readUsers = () => {
//   const stored = readJSON(STORAGE_KEYS.USERS)

//   if (stored) return stored

//   writeJSON(STORAGE_KEYS.USERS, seedUsers)
//   return seedUsers
// }

// export const writeUsers = (users) => writeJSON(STORAGE_KEYS.USERS, users)

// export const toPublicUser = ({ password, ...user }) => user // eslint-disable-line no-unused-vars



import { STORAGE_KEYS } from "../../constants/app"
import { readJSON, writeJSON } from "../../utils/storage"

const OVERRIDES_KEY = "library_user_overrides"

// Users registered inside this app (always admins)
export const readUsers = () => readJSON(STORAGE_KEYS.USERS) ?? []
export const writeUsers = (users) => writeJSON(STORAGE_KEYS.USERS, users)

// { [userId]: false } for deactivated users
export const readOverrides = () => readJSON(OVERRIDES_KEY) ?? {}
export const writeOverrides = (overrides) => writeJSON(OVERRIDES_KEY, overrides)

export const toPublicUser = ({ password, ...user }) => user 