import { Typography } from "@mui/material"
import PageHeader from "../../components/common/PageHeader"
import { useLocale } from "../../providers/LocaleProvider"
import { useAuth } from "../../providers/AuthProvider"

// TODO: summary cards, chart and recent activity (components/dashboard/*)
const Dashboard = () => {
  const { user } = useAuth()
  const { t } = useLocale()

  return (
    <>
      <PageHeader title="Dashboard" />
      <Typography>{t("Welcome,")} {user?.name}</Typography>
    </>
  )
}

export default Dashboard
