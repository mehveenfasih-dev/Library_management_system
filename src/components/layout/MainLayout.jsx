import { useAuth } from "../../providers/AuthProvider"
import AppLayout from "./AppLayout"
import GuestLayout from "./GuestLayout"

// Same routes, different shell: guests get the light layout, signed in users get the drawer.
const MainLayout = () => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <AppLayout /> : <GuestLayout />
}

export default MainLayout
