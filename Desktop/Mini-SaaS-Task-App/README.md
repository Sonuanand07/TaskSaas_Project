# Mini-SaaS Task Management System

Production-ready full-stack task app with auth and multi-user support.

## Tech Stack
- Backend: Node.js/Express/Sequelize/PostgreSQL
- Frontend: React/Vite/TailwindCSS
- Auth: JWT/bcrypt

## Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL (local or cloud like Supabase)
- Git

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env: DB_URL=postgresql://user:pass@localhost:5432/tasksdb, JWT_SECRET=your_secret
npm install
npm run dev  # or npm start
```
API runs on http://localhost:5000

### Frontend
```bash
cd frontend
cp .env.example .env  # REACT_APP_API_URL=http://localhost:5000
npm install
npm run dev
```
App runs on http://localhost:5173

### Database
Create DB `tasksdb` in PostgreSQL:
```sql
CREATE DATABASE tasksdb;
```
Models auto-sync on server start (dev only).

## API Endpoints
- POST /api/auth/signup {email, password}
- POST /api/auth/login {email, password} -> JWT
- GET/POST/PUT/DELETE /api/tasks (Authorization: Bearer <JWT>)

## Features
- Secure multi-user tasks (userId isolation)
- CRUD tasks with status toggle
- Responsive UI
- Error handling

## Deployment
- Backend: Render/Heroku (with PG addon)
- Frontend: Vercel/Netlify
- DB: Supabase/Neon/Render PG

See TODO.md for dev progress.

