# PEP 2026 Interview Management System

## Database: users and login

- **User and admin accounts** are stored in MongoDB (User collection). Signup and login use the database.
- **Every login** (success or failure) is recorded in the **LoginLog** collection (email, role, success, loginAt, userAgent).
- **Admin in DB**: On startup the server creates a default admin if none exists. Log in at `/admin/login` with `admin@example.com` / `admin123`. Override with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` in server `.env`. Optional: run `cd server && node scripts/createAdmin.js` to create or update an admin manually.

## Full stack (server + client-vite)

1. **Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   npm start
   ```
   Server runs at `http://localhost:5000`.

2. **Frontend**
   ```bash
   cd client-vite
   npm install
   npm run dev
   ```
   App at `http://localhost:3000`. API is proxied to the server.

3. **First run**: Sign up at `/signup` (candidate or interviewer). Default admin is created on server start; use `/admin/login` with `admin@example.com` / `admin123` (or your `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## Production

- Set `VITE_API_URL` before building client-vite.
- Build: `cd client-vite && npm run build`. Serve `dist`.
