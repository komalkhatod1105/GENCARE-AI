# GeneCare AI

GeneCare AI is a full-stack healthcare app with a React/Vite frontend and an Express backend.
It includes authentication, protected health tools, and a simple backend API for login and registration.

## Features
- User registration and login
- Protected dashboard and feature pages
- Health tools: diabetes risk, blood pressure analyzer, blood group, genetic risk, breast cancer, medical report, blood donation
- Backend API with CORS support
- LocalStorage auth persistence in frontend

## Prerequisites
- Node.js 18+ / npm
- Git (optional)

## Setup

### Backend
```bash
cd backend
npm install
npm run dev
```
The backend runs on `http://localhost:5000` by default.

### Frontend
```bash
cd frontend
npm install
```
Ensure `frontend/.env` contains:
```env
VITE_BACKEND_URL=http://localhost:5000
```
Then start the frontend:
```bash
npm run dev
```
Open the app at `http://localhost:5175`.

## Available Scripts

### Frontend
- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `npm run preview` — preview built app (if configured)

### Backend
- `npm run dev` — start backend with nodemon
- `npm start` — run backend with Node

## API Endpoints
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — authenticate a user
- `GET /api/test` — backend health check

## Notes
- Current backend stores users in memory only; restarting the backend clears all accounts.
- If you see a network error, confirm the backend is running and `VITE_BACKEND_URL` matches the backend URL.

## Project Structure
- `frontend/` — React application with routes, authentication, and UI pages
- `backend/` — Express server with auth endpoints and CORS enabled

## Troubleshooting
- Start backend first, then frontend.
- Check browser console for request errors.
- Confirm `backend/server.js` is running on port `5000`.


