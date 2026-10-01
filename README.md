# BookHub - Library Management System

React 19 + Vite + MUI + Redux Toolkit + React Router.

## Setup

```bash
npm install
npm run dev
```

## Data API structure

The app runs in mock mode by default. Book, user, and auth API functions are
asynchronous and keep the same request/response boundary as a backend, but use
the local seed data and dummy users. There are no Google Books, DummyJSON, or
Open Library requests. Book covers are generated locally; book CRUD, registered
users, user status overrides, and borrow requests persist in local storage.

`src/api/mappers/bookMapper.js` maps either the local book model or a future
backend response into the app's book model. `src/api/axiosInstance.js` contains
shared Axios behavior for the future backend path.

To opt into a backend later, add this to `.env` and restart Vite:

```
VITE_USE_MOCK=false
VITE_API_BASE_URL=/api
```

The backend path expects generic `/books`, `/books/:id`, `/books/:id/related`,
`/auth/login`, `/auth/register`, and `/users` endpoints. Update the mapper if
the backend's book response shape differs. The default mock mode does not make
these requests.

## Demo accounts

| Role   | Email              | Password   |
| ------ | ------------------ | ---------- |
| Admin  | admin@library.com  | Admin@123  |
| Member | member@library.com | Member@123 |

Auth session cookies are managed by `src/providers/AuthProvider.jsx`; mock
accounts and registered users are handled by the async functions under
`src/api/`.

## Structure

```
src/
  api/          axiosInstance (future backend), bookApi, authApi, userApi
    mappers/    raw API response -> app book model
    mock/       local book/user data and localStorage persistence
  app/          App, routes (nested + guards), routeConfig (one place for all pages)
  components/
    common/     Header, Sidebar, Breadcrumbs, states, dialogs, skeletons
    layout/     MainLayout -> GuestLayout | AppLayout, AuthLayout
    books/      BookCard, BookGrid, search bar, filter panel, admin table, form dialog
    users/      UserTable
    requests/   member/admin borrow request table
    dashboard/  dashboard page
  config/       mock-first API settings
  constants/    app constants, fallback cover image
  hooks/        useForm, useDebounce, useLocalStorage, useInfiniteScroll, useCatalogFilters, useAdminBooks
  pages/        one folder per page
  providers/    AuthProvider (cookie session), ThemeProvider, LocaleProvider
  routes/       ProtectedRoute, RoleRoute, GuestOnlyRoute, route constants
  store/        book, user, request, app slices; error logging middleware
  utils/        storage, auth cookies, error messages, delay, file reading
```
