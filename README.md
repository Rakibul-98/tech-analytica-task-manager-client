# Task Manager — Frontend Client

A full-featured task management web application built with **Next.js 16**, **TypeScript**, and **Redux Toolkit**. Supports role-based access control with separate experiences for Admin and regular User roles. Admins can create, assign, edit, and delete tasks and view a full audit log; Users can view and update the status of their assigned tasks.

## Features

### Admin

- Create, edit, and delete tasks
- Assign tasks to users
- Search tasks by title or description with debounced live search
- Filter tasks by status (Pending / Processing / Done)
- Paginate task list with configurable per-page limit
- View all registered users
- Access full audit log of all system actions

### User

- View all tasks assigned to them
- Update the status of their own tasks
- Search and filter tasks
- View task details via modal

### Shared

- JWT-based authentication with persistent login via `localStorage`
- Protected routes — unauthenticated users are redirected to `/login`
- Toast notifications for all create / update / delete actions
- Responsive layout with collapsible sidebar
- Real-time cache invalidation via RTK Query tag-based refetching

## Tech Stack

| Layer            | Technology                            |
| ---------------- | ------------------------------------- |
| Framework        | Next.js 16 (App Router)               |
| Language         | TypeScript 5                          |
| Styling          | Tailwind CSS v4                       |
| UI Components    | shadcn/ui                             |
| State Management | Redux Toolkit + RTK Query             |
| Form Handling    | React Hook Form + Zod                 |
| Notifications    | Sonner                                |
| Icons            | Lucide React                          |
| HTTP Client      | RTK Query (built on `fetchBaseQuery`) |

## Project Structure

```
├── app/
│   ├── (private)/                  # Route group for authenticated pages
│   │   ├── layout.tsx              # Private layout with sidebar + protected route wrapper
│   │   ├── dashboard/page.tsx
│   │   ├── tasks/page.tsx
│   │   ├── audit-log/page.tsx      # Admin only
│   │   └── users/page.tsx          # Admin only
│   ├── login/page.tsx
│   ├── Components/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx       # Root dashboard component
│   │   │   ├── Header.tsx          # Welcome header with global task search
│   │   │   ├── DashboardStats.tsx  # Stat cards (total, pending, processing, users)
│   │   │   ├── RecentTasks.tsx     # Latest tasks table
│   │   │   └── RecentActivity.tsx  # Audit log preview (admin only)
│   │   ├── Tasks/
│   │   │   ├── Tasks.tsx           # Tasks page root with all state
│   │   │   ├── TaskTable.tsx       # Table with pagination
│   │   │   ├── TaskTableRow.tsx    # Individual row with inline status update
│   │   │   ├── TaskSearchBar.tsx   # Search + filter + per-page controls
│   │   │   ├── CreateTaskModal.tsx # Admin: create new task
│   │   │   ├── EditTaskModal.tsx   # Admin: edit task + assign user
│   │   │   ├── ViewTaskModal.tsx   # View task details
│   │   │   └── DeleteConfirmationModal.tsx
│   │   ├── AuditLog/
│   │   │   ├── AuditLog.tsx        # Audit log page root
│   │   │   ├── AuditTable.tsx      # Paginated audit table
│   │   │   └── AuditRow.tsx        # Single audit entry row
│   │   ├── Users/
│   │   │   ├── Users.tsx           # Users list table
│   │   │   └── UserTableRow.tsx    # Single user row
│   │   ├── Login/
│   │   │   ├── Login.tsx           # Login form with Zod validation
│   │   │   └── ProtectedRoute.tsx  # Auth guard component
│   │   └── shared/
│   │       └── Pagination.tsx      # Reusable pagination component
│   ├── utils/
│   │   ├── task.utils.ts           # Status helpers, formatters, shared handlers
│   │   └── audit.utils.tsx         # Audit action label/color helpers
│   ├── providers/
│   │   └── Providers.tsx           # Redux Provider wrapper
│   ├── globals.css
│   └── layout.tsx                  # Root layout
│
├── components/
│   ├── AppSidebar.tsx              # Collapsible navigation sidebar
│   └── ui/                         # shadcn/ui primitives
│
├── redux/
│   ├── store.ts
│   ├── hooks.ts                    # Typed useAppDispatch / useAppSelector
│   ├── api/
│   │   └── baseApi.ts              # RTK Query base with auth header injection
│   └── features/
│       ├── auth/
│       │   ├── authSlice.ts        # Auth state: user + accessToken
│       │   ├── authApi.ts          # Login endpoint
│       │   └── auth.types.ts
│       ├── task/
│       │   ├── taskApi.ts          # CRUD + status update endpoints
│       │   └── task.type.ts        # Task interfaces and enums
│       ├── user/
│       │   └── userApi.ts          # Get all users endpoint
│       └── audit/
│           └── auditApi.ts         # Get audit logs endpoint
│
├── hooks/
│   └── use-mobile.ts               # Responsive breakpoint hook
├── lib/
│   └── utils.ts                    # cn() utility (clsx + tailwind-merge)
├── .env                            # Environment variables (see below)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- A running instance of the Task Manager backend API

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd task-management-client

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

| Variable              | Description                      | Default                        |
| --------------------- | -------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend REST API | `http://localhost:5000/api/v1` |

## Authentication & Authorization

Authentication is handled via **JWT Bearer tokens**.

- On successful login, the `accessToken` and `user` object are stored in Redux state and persisted to `localStorage`.
- Every API request automatically includes the `Authorization: Bearer <token>` header, injected via the `prepareHeaders` callback in `baseApi.ts`.
- The `ProtectedRoute` component checks for an active session on every private page render. Unauthenticated users are immediately redirected to `/login`.
- Logout clears the Redux auth slice and removes the token from `localStorage`.

### Roles

| Role    | Permissions                                                                        |
| ------- | ---------------------------------------------------------------------------------- |
| `ADMIN` | Full access: create/edit/delete tasks, assign users, view audit log and users list |
| `USER`  | View assigned tasks, update task status, search and filter tasks                   |

Role-based UI rendering is applied at the component level using `user.role === 'ADMIN'` checks throughout the app.

## State Management

Redux Toolkit is used for global state, with **RTK Query** handling all data fetching and caching.
