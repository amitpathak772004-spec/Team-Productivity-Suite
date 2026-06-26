# Team Productivity Suite

A full-stack task and attendance management application built with a React frontend and an Express/MongoDB backend. This project provides authenticated user workflows for managing tasks, attendance, reports, and productivity dashboards.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Frontend Routes](#frontend-routes)
- [How It Works](#how-it-works)
- [Development Notes](#development-notes)
- [License](#license)

## Project Overview

The Team Productivity Suite is a developer-focused application for managing employee productivity, attendance, tasks, and reports. It includes:

- User registration, login, and protected dashboard access
- Task creation, status updates, and priority management
- Attendance check-in/check-out and break tracking
- Report creation and retrieval
- Productivity summary visualizations and dashboard analytics

## Key Features

- Authentication using JWT
- Role-based route access for API operations
- Task board with task creation and status progression
- Attendance management with check-in, check-out, break-in, and break-out endpoints
- Report creation and retrieval functionality
- Dashboard analytics with charts and status summaries
- Protected frontend routes requiring login

## Architecture

This repository contains two main applications:

- `backend/` — Express server with MongoDB persistence
- `frontend/` — React application using Vite, React Router, and Tailwind CSS

The backend exposes REST API endpoints consumed by the frontend through Axios.

## Technology Stack

### Backend

- Node.js
- Express
- MongoDB / Mongoose
- bcryptjs
- jsonwebtoken
- express-validator
- cors
- dotenv
- morgan

### Frontend

- React
- Vite
- React Router DOM
- React Query
- Axios
- Tailwind CSS
- Recharts
- React Hook Form

## Folder Structure

```
backend/
  package.json
  src/
    server.js
    config/db.js
    controllers/
    middlewares/
    models/
    repositories/
    routes/
    services/
    utils/
    validators/
frontend/
  package.json
  src/
    App.jsx
    main.jsx
    index.css
    components/
    context/
    hooks/
    layouts/
    pages/
    services/
```

## Setup and Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm (v10+ recommended)
- MongoDB instance or MongoDB Atlas connection string

### Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd "c:\Users\Amit Pathak\Downloads\task management project\tps\backend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the required environment variables.
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd "c:\Users\Amit Pathak\Downloads\task management project\tps\frontend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open the local URL displayed by Vite in your browser.

## Environment Variables

### Backend `.env`

Create a `backend/.env` file containing:

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### Frontend `.env`

If you want to override the backend API URL, create a `frontend/.env` file containing:

```env
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

### Backend

- `npm start` — Run the production server
- `npm run dev` — Run the server with `nodemon` for development
- `npm run lint` — Run ESLint

### Frontend

- `npm run dev` — Start Vite development server
- `npm run build` — Build the production app
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint on frontend code

## API Endpoints

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/auth/profile` — Retrieve current authenticated user profile

### Attendance

- `POST /api/attendance/checkin` — Record check-in time
- `POST /api/attendance/checkout` — Record check-out time
- `POST /api/attendance/breakin` — Record break start
- `POST /api/attendance/breakout` — Record break end
- `GET /api/attendance/monthly` — Get monthly attendance summary

### Tasks

- `POST /api/tasks` — Create a new task
- `GET /api/tasks` — List tasks
- `GET /api/tasks/:id` — Get task details
- `PUT /api/tasks/:id` — Update task fields and status
- `DELETE /api/tasks/:id` — Delete a task

### Reports

- `POST /api/reports` — Create a new report
- `GET /api/reports` — List reports

### Notifications

- `GET /api/notifications` — Manage notifications from the backend (route available)

### Dashboard

- `GET /api/dashboard` — Fetch dashboard analytics and summary data

## Frontend Routes

- `/login` — Login page
- `/register` — User registration page
- `/` — Protected dashboard landing page
- `/attendance` — Attendance management page
- `/tasks` — Task board page
- `/reports` — Reports page
- `/profile` — User profile page
- `/admin` — Admin panel page

## How It Works

- The frontend stores authentication tokens in `localStorage` under `tps_token`.
- Axios uses an interceptor to attach the JWT token to authorized requests.
- Protected routes ensure only authenticated users can access dashboard pages.
- The backend verifies JWT tokens and applies role-based authorization on task creation and deletion.
- The database connection is managed with Mongoose using `MONGODB_URI`.

## Development Notes

- Backend validation is handled via `express-validator` and custom middleware.
- The React frontend uses React Query for data fetching and caching.
- Tailwind CSS provides the project styling.
- The dashboard uses `recharts` for visual metrics and summary charts.

## License

This project is licensed under the MIT License.
