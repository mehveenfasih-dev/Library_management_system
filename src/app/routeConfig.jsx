import { lazy } from "react"
import { ROUTES } from "../routes/routeConstants"

const Login = lazy(() => import("../pages/auth/Login"))
const Register = lazy(() => import("../pages/auth/Register"))
const Catalog = lazy(() => import("../pages/catalog/Catalog"))
const BookDetails = lazy(() => import("../pages/books/BookDetails"))
const MyRequests = lazy(() => import("../pages/requests/MyRequests"))
const Profile = lazy(() => import("../pages/profile/Profile"))
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))
const Books = lazy(() => import("../pages/books/Books"))
const Users = lazy(() => import("../pages/users/Users"))
const AllRequests = lazy(() => import("../pages/requests/AllRequests"))

// access: "guestOnly" | "public" | "auth" (any signed in user) | "admin"
export const routeConfig = [
  { path: ROUTES.LOGIN, element: <Login />, access: "guestOnly", breadcrumb: "Login" },
  { path: ROUTES.REGISTER, element: <Register />, access: "guestOnly", breadcrumb: "Register" },

  { path: ROUTES.CATALOG, element: <Catalog />, access: "public", breadcrumb: "Catalog" },
  { path: ROUTES.BOOK_DETAILS, element: <BookDetails />, access: "public", breadcrumb: "Book details" },

  { path: ROUTES.MY_REQUESTS, element: <MyRequests />, access: "auth", breadcrumb: "My requests" },
  { path: ROUTES.PROFILE, element: <Profile />, access: "auth", breadcrumb: "Profile" },

  { path: ROUTES.DASHBOARD, element: <Dashboard />, access: "admin", breadcrumb: "Dashboard" },
  { path: ROUTES.BOOKS, element: <Books />, access: "admin", breadcrumb: "Books" },
  { path: ROUTES.USERS, element: <Users />, access: "admin", breadcrumb: "Users" },
  { path: ROUTES.ALL_REQUESTS, element: <AllRequests />, access: "admin", breadcrumb: "All requests" },
]
