// import { lazy } from "react";
// import { ROUTES } from "../routes/routeConstants";

// const Login = lazy(() => import("../pages/auth/Login"));
// const Register = lazy(() => import("../pages/auth/Register"));
// const Contact = lazy(() => import("../pages/contact/Contact"));

// const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

// const Books = lazy(() => import("../pages/books/Books"));
// const BookDetails = lazy(() => import("../pages/books/BookDetails"));

// const Library = lazy(() => import("../pages/library/Library"));
// const Users = lazy(() => import("../pages/users/Users"));
// const Theme = lazy(() => import("../pages/theme/Theme"));

// export const routeConfig = [
//   // ================= AUTH =================
// {
//   path: ROUTES.DASHBOARD,
//   element: <Dashboard />,
//   layout: "dashboard",
//   protected: true,
//   breadcrumb: "Dashboard",
// },

// {
//   path: ROUTES.BOOKS,
//   element: <Books />,
//   layout: "dashboard",
//   protected: true,
//   permission: "view_books",
//   breadcrumb: "Books",
// },

// {
//   path: ROUTES.BOOK_DETAILS,
//   element: <BookDetails />,
//   layout: "dashboard",
//   protected: true,
//   permission: "view_books",
//   breadcrumb: "Book Details",
// },

// {
//   path: ROUTES.LIBRARY,
//   element: <Library />,
//   layout: "dashboard",
//   protected: true,
//   permission: "manage_library",
//   breadcrumb: "Library",
// },

// {
//   path: ROUTES.USERS,
//   element: <Users />,
//   layout: "dashboard",
//   protected: true,
//   permission: "manage_users",
//   breadcrumb: "Users",
// },

// {
//   path: ROUTES.THEME,
//   element: <Theme />,
//   layout: "dashboard",
//   protected: true,
//   permission: "manage_theme",
//   breadcrumb: "Theme",
// },
// ]



export const routeConfig = [
  // ================= AUTH =================

  {
    path: ROUTES.LOGIN,
    element: <Login />,
    layout: "auth",
    protected: false,
  },

  {
    path: ROUTES.REGISTER,
    element: <Register />,
    layout: "auth",
    protected: false,
  },

  // ================= PUBLIC =================

  {
    path: ROUTES.CATALOG,
    element: <Catalog />,
    layout: "app",
    protected: false,
    breadcrumb: "Catalog",
  },

  {
    path: ROUTES.BOOK_DETAILS,
    element: <BookDetails />,
    layout: "app",
    protected: false,
    breadcrumb: "Book Details",
  },

  // ================= MEMBER =================

  {
    path: ROUTES.MY_REQUESTS,
    element: <MyRequests />,
    layout: "app",
    protected: true,
    breadcrumb: "My Requests",
  },

  {
    path: ROUTES.PROFILE,
    element: <Profile />,
    layout: "app",
    protected: true,
    breadcrumb: "Profile",
  },

  // ================= ADMIN =================

  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    layout: "app",
    protected: true,
    role: "admin",
    breadcrumb: "Dashboard",
  },

  {
    path: ROUTES.BOOKS,
    element: <Books />,
    layout: "app",
    protected: true,
    role: "admin",
    breadcrumb: "Books",
  },

  {
    path: ROUTES.USERS,
    element: <Users />,
    layout: "app",
    protected: true,
    role: "admin",
    breadcrumb: "Users",
  },

  {
    path: ROUTES.ALL_REQUESTS,
    element: <AllRequests />,
    layout: "app",
    protected: true,
    role: "admin",
    breadcrumb: "All Requests",
  },
];