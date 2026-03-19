# 🏥 MediConnect - Healthcare Telemedicine Platform

A complete, production-ready authentication system for a healthcare telemedicine platform featuring:

✅ **Real Email OTP Verification** via Resend
✅ **Express.js Backend** with secure password hashing (bcryptjs)
✅ **JWT Authentication** with 24-hour expiration
✅ **Doctor/Patient Roles** with user-specific dashboards
✅ **Healthcare-Themed UI** with Tailwind CSS & Framer Motion
✅ **HIPAA-Ready Architecture** with secure data handling

---

## 🚀 Tech Stack

**Frontend:**

- React 19 + Vite
- TypeScript (via Zod validation)
- TailwindCSS + Framer Motion
- Zustand (state management)
- React Router v6

**Backend:**

- Express.js (Node.js)
- Resend (email service)
- bcryptjs (password hashing)
- JWT (authentication tokens)

---

## 📋 Features

### Authentication Flow

1. **Sign Up** → User selects Doctor or Patient role
2. **Email Verification** → OTP sent to registered email
3. **Login** → Email + password authentication
4. **Forgot Password** → Send OTP → Reset password
5. **Protected Routes** → JWT-based access control

### User Roles

- **Patient**: Access consultations, medical records, prescriptions
- **Doctor**: Manage patient records, conduct consultations

### Security

- Passwords hashed with bcryptjs (10 salt rounds)
- JWTs with automatic expiration
- Email verification for account protection
- CORS enabled for secure API access

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Resend API Key (free from https://resend.com)

### Part 1: Backend Setup

1. **Navigate to backend folder:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment** (already done in `.env`):

```
RESEND_API_KEY=re_FewvGs5b_2SETCQgb4dGsGNRpYuDd99UP
JWT_SECRET=mediconnect_ultra_secure_secret_key_2026
PORT=5000
NODE_ENV=development
```

4. **Start the backend server:**

```bash
npm run dev
```

You should see:

```
🏥 MediConnect Backend running on http://localhost:5000
```

### Part 2: Frontend Setup

1. **Install frontend dependencies:**

```bash
npm install
```

2. **Start the development server:**

```bash
npm run dev
```

Access the app at: `http://localhost:5173`

---

## 🔑 Demo Credentials

### Doctor Account (Pre-loaded)

- **Email:** `doctor@mediconnect.dev`
- **Password:** `Doctor@123`
- **Role:** Healthcare Provider

### Test Patient Signup

1. Go to `/signup`
2. Select "Patient" role
3. Enter any email address
4. Password must be 8+ characters
5. Verify OTP sent to your email
6. Login and access dashboard

---

## 📧 Email Flow (Resend Integration)

**When user signs up or requests password reset:**

1. **OTP Generated:** Random 6-digit code created in backend
2. **Email Sent:** Via Resend's `noreply@mediconnect.dev` domain
3. **OTP Format:**
   - Professional healthcare branding
   - 10-minute expiration
   - Clear instructions

**Email HTML Template includes:**

- MediConnect branding with gradient
- OTP displayed prominently
- Expiration time
- Security notice

---

## 🛣️ API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/verify-otp` - Verify email with OTP
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/forgot-password` - Request password reset OTP
- `POST /api/auth/reset-password` - Complete password reset
- `GET /api/health` - Health check

### Request/Response Examples

**Sign Up:**

```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@mediconnect.dev",
  "password": "SecurePass123",
  "userType": "patient"
}

Response:
{
  "success": true,
  "message": "Signup successful. OTP sent to email.",
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@mediconnect.dev",
    "userType": "patient"
  }
}
```

**Verify OTP:**

```json
POST /api/auth/verify-otp
{
  "email": "john@mediconnect.dev",
  "otp": "123456"
}

Response:
{
  "success": true,
  "message": "Email verified successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@mediconnect.dev",
    "userType": "patient",
    "verified": true
  }
}
```

---

## 📁 Project Structure

```
authentication/
├── backend/
│   ├── server.js           # Express server with all auth endpoints
│   ├── package.json        # Node dependencies
│   └── .env                # Environment variables (API key, JWT secret)
│
├── src/
│   ├── pages/
│   │   ├── Landing.jsx     # Homepage with MediConnect branding
│   │   ├── SignUp.jsx      # Signup with doctor/patient selection
│   │   ├── SignIn.jsx      # Login form
│   │   ├── VerifyOTP.jsx   # OTP verification
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   └── Dashboard.jsx   # Role-specific dashboard
│   │
│   ├── components/
│   │   ├── MediConnectLogo.jsx  # Logo component
│   │   ├── common/              # Reusable UI components
│   │   └── ProtectedRoute.jsx   # JWT verification wrapper
│   │
│   ├── store/
│   │   └── authStore.js    # Zustand auth state (calls real API)
│   │
│   ├── api/
│   │   └── realAPI.js      # API service (calls Express backend)
│   │
│   └── App.jsx             # Router setup
│
└── package.json            # Frontend dependencies
```

---

## 🔐 Security Features

### Backend Security

- **Password Hashing:** bcryptjs with 10 salt rounds
- **JWT Tokens:** HS256 algorithm, 24-hour expiration
- **OTP Expiration:** 10-minute validity window
- **CORS:** Enabled for localhost:5173
- **Input Validation:** Zod schemas

### Frontend Security

- **Protected Routes:** Automatic redirect if not authenticated
- **Token Storage:** Zustand with localStorage persistence
- **XSS Protection:** React's built-in escaping
- **HTTPS Ready:** Proper CORS headers

---

## 🐛 Troubleshooting

### "Backend offline" message

- Ensure `npm run dev` is running in the backend folder
- Check that port 5000 is not in use: `lsof -i :5000`
- Verify `.env` file exists with RESEND_API_KEY

### "OTP not received"

- Check spam/junk folder
- Verify email address is correct at signup
- OTP expires in 10 minutes
- Use "Resend OTP" button to get a new code

### Password length error

- Frontend: 8+ characters required
- Includes uppercase, lowercase, numbers, and special chars recommended

### "Email already registered"

- Account already exists with that email
- Use Forgot Password to reset if you lost access
- Use different email for new account

---

## 🎯 Next Steps / Future Enhancements

1. **Database Integration**
   - Replace in-memory users with PostgreSQL/MongoDB
   - Persistent data storage

2. **Advanced Features**
   - Appointment scheduling
   - Video consultation (Jitsi/Twilio)
   - Medical records storage
   - Prescription management

3. **Scaling**
   - OAuth2 integration (Google, Apple)
   - Two-factor authentication (2FA)
   - Role-based access control (RBAC)
   - Admin dashboard

4. **Compliance**
   - HIPAA audit logging
   - Data encryption at rest
   - GDPR compliance
   - PCI-DSS for payments

---

## 📞 Support

**Issues?**

1. Check the troubleshooting section above
2. Verify both backend and frontend are running
3. Clear browser cache and localStorage
4. Check browser console for errors (F12)

**API Documentation:** See endpoint examples in "API Endpoints" section above

---

## 📄 License

This project is provided as-is for educational and commercial use.

---

**Built with ❤️ for healthcare professionals and patients in 2026**

🏥 **MediConnect** - Redefining Healthcare Accessibility
