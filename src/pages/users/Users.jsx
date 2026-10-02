import { useCallback, useEffect, useState } from "react"
import { FormControl, InputAdornment, InputLabel, MenuItem, Pagination, Select, Stack, TextField } from "@mui/material"
import { Search } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { Box } from "@mui/system"

import UserTable from "../../components/users/UserTable"
import EmptyState from "../../components/common/EmptyState"
import ErrorState from "../../components/common/ErrorState"
import PageHeader from "../../components/common/PageHeader"

import useDebounce from "../../hooks/useDebounce"
import { fetchUsers, selectUsers, toggleUserStatus } from "../../store/slices/userSlice"
import { USERS_PAGE_SIZE } from "../../constants/app"
import { useLocale } from "../../providers/LocaleProvider"
import { useAuth } from "../../providers/AuthProvider"
import { useNotification } from "../../providers/NotificationProvider"

const Users = () => {
  const dispatch = useDispatch()
  const { t } = useLocale()
  const { user: currentUser } = useAuth()
  const { notify } = useNotification()
  const { users, total, status, error } = useSelector(selectUsers)

  const [searchInput, setSearchInput] = useState("")
  const [role, setRole] = useState("")
  const [page, setPage] = useState(1)

  const search = useDebounce(searchInput, 400).trim()
  const totalPages = Math.ceil(total / USERS_PAGE_SIZE)

  const load = useCallback(
    () => dispatch(fetchUsers({ search, role, page })),
    [dispatch, search, role, page]
  )

  useEffect(() => {
    load()
  }, [load])

  const handleSearch = (event) => {
    setSearchInput(event.target.value)
    setPage(1)
  }

  const handleRole = (event) => {
    setRole(event.target.value)
    setPage(1)
  }

  const handleToggle = useCallback(
    async (user) => {
      const active = !user.active

      try {
        await dispatch(toggleUserStatus({ id: user.id, active })).unwrap()
        notify(`${user.name}: ${t(active ? "Account activated." : "Account deactivated.")}`)
      } catch {
        notify("Could not update the user.", "error")
      }
    },
    [dispatch, notify, t]
  )

  const loading = status === "loading" || status === "idle"

  const renderBody = () => {
    if (status === "failed") return <ErrorState title="Could not load users" message={error} onRetry={load} />

    if (!loading && users.length === 0) {
      return <EmptyState title="No users found" message="Try a different search or role filter." />
    }

    return <UserTable users={users} loading={loading} currentUserId={currentUser?.id} onToggle={handleToggle} />
  }

  return (
    <>
      <PageHeader title="Users" subtitle="Search members and activate or deactivate accounts." />

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2.5} mb={4}>
        <TextField
          fullWidth
          value={searchInput}
          onChange={handleSearch}
          placeholder={t("Search by name or email")}
          sx={{
            flex: 1,
            minWidth: 0,
            maxWidth: { xs: "100%", lg: 560 },
            "& .MuiOutlinedInput-root": { backgroundColor: "background.paper" },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl sx={{ width: { xs: "100%", lg: 220 }, flexShrink: 0, backgroundColor: "background.paper" }}>
          <InputLabel>Role</InputLabel>
          <Select label={t("Role")} value={role} onChange={handleRole}>
            <MenuItem value="">{t("All roles")}</MenuItem>
            <MenuItem value="admin">{t("Admin")}</MenuItem>
            <MenuItem value="member">{t("Member")}</MenuItem>
          </Select>
        </FormControl>
      </Stack>
        <Box sx={{ mt: 3 }}>
        {renderBody()}
      </Box>

     

      {totalPages > 1 && (
        <Stack direction="row" justifyContent="flex-end" mt={4}>
          <Pagination count={totalPages} page={page} color="primary" onChange={(_, value) => setPage(value)} />
        </Stack>
      )}
    </>
  )
}

export default Users
