# How This Website Is Built (Authentication System)

This document explains how the project is structured, how the core authentication flow works, and which pieces of code are responsible for each part. It is written for developers who want to understand, extend, or maintain the system.

---

## 1) High-Level Architecture

This project is a **full-stack authentication system** consisting of:

- ✅ **Frontend (React)** - UI and user interaction
- ✅ **Backend (Express)** - API endpoints and authentication logic
- ✅ **Local Persistence (File-based DB)** - Data stored in `backend/db.json` for development

### 🔌 Data Flow

1. User interacts with the UI (Signup/Login/Forgot Password)
2. Frontend calls backend endpoints (`/api/auth/*`)
3. Backend validates, updates database, and returns JSON responses
4. Frontend updates global state, navigates pages, and shows feedback

---

## 2) Tech Stack

### Frontend
- **React** (JSX + hooks)
- **Vite** (dev server + build)
- **TailwindCSS** (styles)
- **Framer Motion** (animations)
- **Zustand** (state management)
- **React Hook Form + Zod** (form handling + validation)

### Backend
- **Node + Express** (API server)
- **bcryptjs** (password hashing)
- **jsonwebtoken** (JWT tokens)
- **Resend** (email API, used for OTP delivery)

---

## 3) How to Run It

### 1) Install dependencies (single command):
```bash
npm install
```

### 2) Start Frontend:
```bash
npm run dev
```

### 3) Start Backend (new terminal):
```bash
cd backend && npm run dev
```

### 4) Visit:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/health`

---

## 4) Core Authentication Flow (Signup + OTP + Login)

### ✅ 1) Signup
`src/pages/SignUp.jsx` displays the signup form.

- Submits data to `src/store/authStore.js` → `apiSignup()`
- `apiSignup()` calls backend `POST /api/auth/signup`

**Backend flow (`backend/server.js`)**:
1. Validate fields (name/email/password)
2. Hash password (bcrypt)
3. Persist user into `backend/db.json`
4. Generate OTP and save to `database.otps`
5. Send OTP email (Resend API + console fallback)

**Development helpers:**
- OTP is logged in backend terminal
- OTP is returned by API in development mode (so the frontend can show an alert)

### ✅ 2) OTP Verification
`src/pages/VerifyOTP.jsx` handles OTP input.

- Submits OTP to `POST /api/auth/verify-otp`
- Backend checks stored OTP (and expiry), marks user `verified = true`, deletes OTP
- Returns JWT token and verified user data

### ✅ 3) Login
`src/pages/SignIn.jsx` handles login.

- Submits credentials to `POST /api/auth/login`
- Backend checks email/password + `verified` status
- Returns JWT + user payload

---

## 5) Important Files & Folders

| File / Folder | Purpose |
| --- | --- |
| `src/App.jsx` | Routes and protected route logic |
| `src/store/authStore.js` | Global auth state (login/signup/logout) |
| `src/api/realAPI.js` | Fetch wrapper for backend calls |
| `src/pages/SignUp.jsx` | Signup UI |
| `src/pages/SignIn.jsx` | Login UI |
| `src/pages/VerifyOTP.jsx` | OTP verification UI |
| `src/pages/ForgotPassword.jsx` | Password reset flow |
| `backend/server.js` | All backend API routes & auth logic |
| `backend/db.json` | Persistent data store (dev-only) |
| `.env` | Backend secrets (JWT secret, Resend API key) |

---

## 6) Backend “Database” Behavior

- Uses a simple JSON file: `backend/db.json`
- Data structures:
  - `users`: user objects (id, email, passwordHash, verified, ...)
  - `otps`: temporary OTP store (email → code + expiry)
  - `resetTokens`: password reset OTPs (email → code + expiry)

> The data persists across restarts and is safe for development. For production, replace with a real database (Postgres, MongoDB, etc.).

---

## 7) OTP & Email Behavior

### Development Mode
- OTP is always logged to the **backend terminal**
- OTP is returned by the API response (so the frontend can show it in an alert)
- Email sending is attempted, but if it fails (common in dev), it falls back to console logging

### Production Mode (Optional)
- To enable real email delivery, configure:
  - `backend/.env` with a valid `RESEND_API_KEY`
  - Verify a domain in Resend and use that email as the `from` address

---

## 8) How to Extend the System

### Add Real Database
- Replace `backend/server.js` storage logic with a real DB client (Prisma/Postgres, MongoDB, etc.)
- Keep API contract the same and update user CRUD functions accordingly

### Add Role-Based Pages
- Add new routes and protect them with `ProtectedRoute` (in `src/components/ProtectedRoute.jsx`)
- Use `user.userType` to conditionally render different content

### Add Refresh Tokens
- Extend backend to issue refresh tokens
- Store them securely (httpOnly cookies)
- Add `/api/auth/refresh` endpoint

---

## 9) Where to Start Reading the Code

1. `src/App.jsx` → overall UI structure + routes
2. `src/store/authStore.js` → core auth logic + API calls
3. `backend/server.js` → entire backend API flow
4. `src/pages/*` → individual pages that users interact with

---

## 10) Helpful Tips

- Run `npm run lint` to check code style
- Open browser console/network tab to inspect API calls
- Use `backend/db.json` to see stored users and OTP states

---

If you want, I can also create a **diagram** of the authentication flow (frontend → backend → data store) or generate a **quick cheatsheet** for adding new pages and API routes.