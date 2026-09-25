import { ROUTES } from "../routes/routeConstants";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Contact from "../pages/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import Books from "../pages/books/Books";
import BookDetails from "../pages/books/BookDetails";
import Library from "../pages/library/Library";
import Users from "../pages/users/Users";
import Theme from "../pages/theme/Theme";

export const routeConfig = [
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

  {
    path: ROUTES.CONTACT,
    element: <Contact />,
    layout: "landing",
    protected: false,
  },

  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    layout: "dashboard",
    protected: true,
  },

  {
    path: ROUTES.BOOKS,
    element: <Books />,
    layout: "landing",
    protected: false,
  },

  {
    path: ROUTES.BOOK_DETAILS,
    element: <BookDetails />,
    layout: "landing",
    protected: false,
  },

  {
    path: ROUTES.LIBRARY,
    element: <Library />,
    layout: "dashboard",
    protected: true,
  },

  {
    path: ROUTES.USERS,
    element: <Users />,
    layout: "dashboard",
    protected: true,
  },

  {
    path: ROUTES.THEME,
    element: <Theme />,
    layout: "dashboard",
    protected: true,
  },
];