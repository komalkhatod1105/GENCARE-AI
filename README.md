# GeneCare AI

GeneCare AI is a full-stack healthcare application with a React/Vite frontend and an Express + MongoDB backend. It includes user authentication, protected health tools, dashboards, prediction pages, and medical report workflows.

## Features
- User registration and login
- Protected dashboard and feature pages
- Health tools: diabetes risk, blood pressure analyzer, blood group, genetic risk, breast cancer, medical report, blood donation
- Backend API with CORS and JWT auth
- MongoDB-backed user storage
- Frontend auth persistence via local storage

## Prerequisites
- Node.js 18+ and npm
- Docker Desktop (for MongoDB locally)
- Git (optional)

## Quick Start

### 1) Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Start MongoDB
```bash
docker compose up -d mongodb
```

### 3) Configure environment files
The repository already contains working defaults, but you can copy the examples if needed:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 4) Run backend
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000.

### 5) Run frontend
In a second terminal:
```bash
cd frontend
npm run dev
```
Open http://localhost:5175.

## Available Scripts

### Backend
- `npm run dev` — start the API with nodemon
- `npm start` — start the API with Node

### Frontend
- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build

## Main API Endpoints
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — authenticate a user
- `GET /api/health` — backend health check
- `GET /api/auth/profile` — get authenticated user profile

## Project Structure
- `frontend/` — React application with routes, authentication, and UI pages
- `backend/` — Express server, controllers, models, and routes
- `docker-compose.yml` — MongoDB container configuration

## Troubleshooting
- Start MongoDB first, then start the backend.
- If requests fail, verify that the backend is running on port 5000 and that the frontend can reach it via the Vite proxy.
- If you change ports, update the backend `.env` and frontend `.env` accordingly.


