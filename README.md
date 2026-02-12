# PEP 2026 Interview Management System

## Database: users and login

- **User and admin accounts** are stored in MongoDB (User collection). Signup and login use the database.
- **Every login** (success or failure) is recorded in the **LoginLog** collection (email, role, success, loginAt, userAgent).
- **Admin in DB**: Run `cd server && node scripts/createAdmin.js` to create an admin user. Then log in at `/admin/login` with `admin@example.com` / `admin123` (or set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in server `.env` before running the script).

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

3. **First run**: Sign up at `/signup` (candidate or interviewer). Create admin: `cd server && node scripts/createAdmin.js`, then use `/admin/login`.

## Production

- Set `VITE_API_URL` before building client-vite.
- Build: `cd client-vite && npm run build`. Serve `dist`.
