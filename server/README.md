# PEP 2026 Interview Management – Backend

Node.js, Express, and MongoDB backend for the interview management system.

## Setup

1. **Install dependencies**

   ```bash
   cd server
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set:

   - `PORT` – server port (default `5000`)
   - `MONGODB_URI` – MongoDB connection string (e.g. `mongodb://localhost:27017/pep_interview_db` or MongoDB Atlas URI)

3. **MongoDB**

   - **Using MongoDB Compass (local):** Start MongoDB, then in Compass connect to `mongodb://localhost:27017`. Create or select the database `pep_interview_db`. Use the same URI in `.env`: `MONGODB_URI=mongodb://localhost:27017/pep_interview_db`.
   - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and put your Atlas connection string in `MONGODB_URI`.

## Run

```bash
npm start
```

Development with auto-restart:

```bash
npm run dev
```

Server runs at `http://localhost:5000`. The React client should use `http://localhost:5000/api` as the API base URL.

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user (JWT required) |
| GET | `/api/admin/interviews` | List all interviews (admin only) |
| GET | `/api/admin/users` | List all users (admin only) |
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update profile |
| GET | `/api/interviews/user/:userId` | List user interviews (optional `?status=`) |
| GET | `/api/interviews/:id` | Get interview by id |
| POST | `/api/interviews` | Create interview (body includes `userId`) |
| PUT | `/api/interviews/:id` | Update interview |
| GET | `/api/notifications/user/:userId` | List notifications |
| PATCH | `/api/notifications/:id/read` | Mark notification read |

## Project structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js
│   │   ├── Interview.js
│   │   └── Notification.js
│   ├── controllers/
│   ├── routes/
│   ├── app.js             # Express app & middleware
│   └── index.js           # Entry: connect DB, start server
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Admin access

- Admin routes require JWT with `role: "admin"`. To create an admin user, set one user's `role` to `"admin"` in MongoDB (e.g. in Compass: open `users` collection, edit a document, set `role` to `admin`), then log in with that email/password on the **Admin login** page (`/admin/login`).

## Next steps

- Add **forgot-password** flow (token + email or stub).
- Add file upload (e.g. **multer**) for resume/CV and store URL in user profile.
- Add admin routes for managing interviews and users.
