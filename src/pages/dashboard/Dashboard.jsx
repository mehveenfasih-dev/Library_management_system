import { useMemo } from "react"
import { Box, Card, CardActionArea, CardContent, Chip, Grid, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import PageHeader from "../../components/common/PageHeader"
import { selectCatalog } from "../../store/slices/bookSlice"
import { selectRequests } from "../../store/slices/requestSlice"
import { selectUsers } from "../../store/slices/userSlice"
import { ROUTES } from "../../routes/routeConstants"
import { useLocale } from "../../providers/LocaleProvider"
import { useAuth } from "../../providers/AuthProvider"

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t } = useLocale()
  const { books, total: totalBooks } = useSelector(selectCatalog)
  const { requests } = useSelector(selectRequests)
  const { users } = useSelector(selectUsers)

  const summary = useMemo(() => {
    const activeBorrows = requests.filter((request) => request.status === "approved" || request.status === "overdue").length
    const overdue = requests.filter((request) => request.status === "overdue").length
    const totalMembers = users.length
    const availableBooks = books.filter((book) => book.available).length

    const monthlyData = Array.from({ length: 6 }, (_, index) => {
      const label = new Date(2025, index, 1).toLocaleString("en-US", { month: "short" })
      const value = requests.filter((request) => {
        const month = new Date(request.requestedAt).getMonth()
        return month === index
      }).length

      return { label, value }
    })

    return {
      totalBooks,
      activeBorrows,
      overdue,
      totalMembers,
      availableBooks,
      monthlyData,
    }
  }, [books, requests, totalBooks, users.length])

  const cards = [
    { title: "Total books", value: summary.totalBooks, action: () => navigate(ROUTES.CATALOG), accent: "primary" },
    { title: "Active borrows", value: summary.activeBorrows, action: () => navigate(ROUTES.ALL_REQUESTS), accent: "success" },
    { title: "Overdue", value: summary.overdue, action: () => navigate(ROUTES.ALL_REQUESTS), accent: "warning" },
    { title: "Members", value: summary.totalMembers, action: () => navigate(ROUTES.USERS), accent: "info" },
  ]

  return (
    <>
      <PageHeader title="Dashboard" subtitle={`Welcome back, ${user?.name ?? "librarian"}.`} />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", height: "100%" }}>
              <CardActionArea onClick={card.action} sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} mt={1}>
                    {card.value}
                  </Typography>
                  <Chip
                    label="Open"
                    size="small"
                    color={card.accent}
                    variant="outlined"
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", p: 2, height: "100%" }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Borrow trend
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end", height: 200, gap: 1, mt: 2 }}>
              {summary.monthlyData.map((item) => (
                <Box key={item.label} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 42,
                      height: `${Math.max(item.value * 28, 10)}px`,
                      bgcolor: "primary.main",
                      borderRadius: "8px 8px 0 0",
                      opacity: 0.9,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", p: 2, height: "100%" }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Top borrowed books
            </Typography>
            <Stack spacing={1.5} mt={2}>
              {books.slice(0, 4).map((book) => (
                <Box
                  key={book.id}
                  sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, py: 0.5 }}
                >
                  <Typography variant="body2" noWrap sx={{ maxWidth: 180 }}>
                    {book.title}
                  </Typography>
                  <Chip label={book.available ? "Available" : "Busy"} size="small" color={book.available ? "success" : "warning"} variant="outlined" />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
