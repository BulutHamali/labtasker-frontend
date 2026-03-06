# LabTasker

A research project and task management application built for academic labs and researchers. Designed to help individuals and small teams organize projects, track tasks, and monitor progress through a Kanban-style workflow.

> **Status:** Active development. Core CRUD functionality and drag-and-drop task board are complete. The backend lives in a separate repository.

---

## Live Demo

[https://labtasker-frontend.onrender.com](https://labtasker-frontend.onrender.com)

---

## Features

- **Project Management** — Create and organize research projects with names and descriptions.
- **Task Board** — Drag-and-drop Kanban board with three columns: To Do, In Progress, and Done.
- **Task CRUD** — Add, edit, delete, and mark tasks complete. Supports optional due dates.
- **Progress Tracking** — Per-project progress bar based on completed task count.
- **JWT Authentication** — Registration and login with token-based protected routes.
- **Responsive Layout** — Functional across desktop and tablet screen sizes.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Framework | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Routing | React Router v7 |
| Data Fetching | Axios, TanStack Query |
| Drag and Drop | @hello-pangea/dnd |
| Auth | JWT (managed via React Context) |
| Notifications | Sonner |
| Backend | Node.js, Express, MongoDB, Mongoose (separate repo) |

---

## Project Structure

This repository contains the frontend only.

```
labtasker-frontend/
├── src/
│   ├── components/       # Navbar and shared UI components
│   ├── context/          # AuthContext for JWT token management
│   ├── hooks/            # useApi — axios instance with auth header injection
│   ├── pages/            # LandingPage, LoginPage, RegisterPage,
│   │                     # DashboardPage, ProjectDetailsPage, NotFound
│   ├── lib/              # Utility functions (cn, etc.)
│   ├── App.tsx           # Route definitions and protected route logic
│   └── main.tsx          # App entry point
├── index.html
├── vite.config.ts
└── tailwind.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the LabTasker backend (separate repository)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/labtasker-frontend.git
cd labtasker-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Replace the value with your backend URL if it is deployed remotely.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## API Overview

The frontend communicates with a REST API. Expected endpoints:

```
POST   /api/users/register                        Register a new user
POST   /api/users/login                           Authenticate and receive a JWT

GET    /api/projects                              List all projects (protected)
POST   /api/projects                              Create a project (protected)
GET    /api/projects/:id                          Get a single project (protected)
PUT    /api/projects/:id                          Update a project (protected)

GET    /api/tasks/:projectId/tasks                List tasks for a project (protected)
POST   /api/projects/:id/tasks                    Add a task to a project (protected)
PUT    /api/tasks/:projectId/tasks/:id            Update a task (protected)
DELETE /api/tasks/:projectId/tasks/:id            Delete a task (protected)
PUT    /api/tasks/:projectId/tasks/reorder        Reorder tasks after drag-and-drop (protected)
```

---

## Known Limitations

- **Token persistence:** The JWT is stored in React state and is lost on page refresh. Persistent sessions via localStorage or cookies are not yet implemented.
- **No multi-user collaboration:** Projects and tasks are scoped to the authenticated user. Shared workspaces are not supported at this stage.

---

## Roadmap

- [ ] Persist auth token across page refreshes
- [ ] Email notifications for approaching deadlines
- [ ] Analytics view with task completion trends
- [ ] Time tracking per task
- [ ] Lab-specific extensions (e.g., reagent inventory, experiment protocol tracking)

---

## Dependencies

**Runtime**

- `react`, `react-dom`, `react-router-dom`
- `axios`, `@tanstack/react-query`
- `@hello-pangea/dnd`
- `sonner`, `lucide-react`, `next-themes`
- `@fontsource/inter`

**Dev / Build**

- `tailwindcss`, `clsx`, `tailwind-merge`, `class-variance-authority`
- `shadcn-ui`, `@radix-ui/react-tooltip`
- `vite`, `typescript`, `eslint`

---

## License

MIT License © 2025 [Your Name]
