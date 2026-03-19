# AuthFlow - Complete API Reference

## 🔌 Mock API Endpoints

The mock API simulates a complete authentication backend with realistic delays.

---

## POST /api/signup

Create a new user account and send OTP verification code.

### Request

```javascript
{
  "name": string (2-50 characters),
  "email": string (valid email format),
  "password": string (6+ characters)
}
```

### Example

```bash
curl -X POST http://localhost:5173/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Success Response (200)

```javascript
{
  "success": true,
  "user": {
    "id": "1709000000000",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "OTP sent to john@example.com. Use OTP: 123456"
}
```

### Error Response (400)

```javascript
{
  "success": false,
  "error": "Email already registered"
}
```

### Possible Errors

- `"Missing required fields"` - name, email, or password missing
- `"Password must be at least 6 characters"` - password too short
- `"Email already registered"` - email exists in database

### Simulated Delay

1200ms

---

## POST /api/login

Authenticate user with email and password.

### Request

```javascript
{
  "email": string (valid email),
  "password": string
}
```

### Example

```bash
curl -X POST http://localhost:5173/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "Demo@123"
  }'
```

### Success Response (200)

```javascript
{
  "success": true,
  "token": "eyJzdWIiOiIxIiwiZW1haWwiOiJkZW1vQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRGVtbyIsImlhdCI6MTcwOTAwMDAwMCwiZXhwIjoxNzA5MDg2NDAwfQ==",
  "user": {
    "id": "1",
    "name": "John Demo",
    "email": "demo@example.com"
  }
}
```

### Error Response (400)

```javascript
{
  "success": false,
  "error": "Invalid email or password"
}
```

### Possible Errors

- `"Email and password are required"` - missing fields
- `"Invalid email or password"` - wrong credentials
- `"Email not verified. Please verify your email first."` - account not verified via OTP

### Simulated Delay

1000ms

---

## POST /api/send-otp

Send OTP code to email for password recovery or verification.

### Request

```javascript
{
  "email": string (valid email)
}
```

### Example

```bash
curl -X POST http://localhost:5173/api/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com"
  }'
```

### Success Response (200)

```javascript
{
  "success": true,
  "message": "OTP sent to demo@example.com. Use OTP: 654321"
}
```

### Error Response (400)

```javascript
{
  "success": false,
  "error": "User not found"
}
```

### Possible Errors

- `"Email is required"` - email missing
- `"User not found"` - email not registered

### Simulated Delay

800ms

### OTP Validity

- Duration: 10 minutes
- Format: 6 digits
- Single use only

---

## POST /api/verify-otp

Verify OTP code sent to user's email.

### Request

```javascript
{
  "email": string (email OTP was sent to),
  "otp": string (6-digit code)
}
```

### Example

```bash
curl -X POST http://localhost:5173/api/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "otp": "654321"
  }'
```

### Success Response (200)

```javascript
{
  "success": true,
  "token": "eyJzdWIiOiIxIiwiZW1haWwiOiJkZW1vQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRGVtbyIsImlhdCI6MTcwOTAwMDAwMCwiZXhwIjoxNzA5MDg2NDAwfQ==",
  "user": {
    "id": "1",
    "name": "John Demo",
    "email": "demo@example.com"
  }
}
```

### Error Response (400)

```javascript
{
  "success": false,
  "error": "Invalid OTP"
}
```

### Possible Errors

- `"Email and OTP are required"` - missing fields
- `"No OTP found for this email"` - OTP not sent to this email
- `"OTP expired"` - OTP validity period exceeded
- `"Invalid OTP"` - wrong code entered

### Simulated Delay

900ms

---

## POST /api/reset-password

Set a new password after OTP verification.

### Request

```javascript
{
  "email": string (email user is resetting password for),
  "newPassword": string (6+ characters)
}
```

### Example

```bash
curl -X POST http://localhost:5173/api/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "newPassword": "NewSecurePass456"
  }'
```

### Success Response (200)

```javascript
{
  "success": true,
  "message": "Password reset successfully"
}
```

### Error Response (400)

```javascript
{
  "success": false,
  "error": "Password must be at least 6 characters"
}
```

### Possible Errors

- `"Email and new password are required"` - missing fields
- `"Password must be at least 6 characters"` - password too short
- `"User not found"` - email not in database

### Simulated Delay

1100ms

### Requirements

- Must verify OTP first
- Password minimum 6 characters
- Old password different from new password (optional validation)

---

## GET /api/user

Fetch current authenticated user's information.

### Headers

```http
Authorization: Bearer {token}
```

### Example

```bash
curl -X GET http://localhost:5173/api/user \
  -H "Authorization: Bearer eyJzdWIiOiIxIiwiZW1haWwiOiJkZW1vQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRGVtbyIsImlhdCI6MTcwOTAwMDAwMCwiZXhwIjoxNzA5MDg2NDAwfQ=="
```

### Success Response (200)

```javascript
{
  "success": true,
  "user": {
    "id": "1",
    "name": "John Demo",
    "email": "demo@example.com",
    "createdAt": "2024-02-26T10:00:00.000Z"
  }
}
```

### Error Response (400)

```javascript
{
  "success": false,
  "error": "Invalid token"
}
```

### Possible Errors

- `"No token provided"` - missing Authorization header
- `"Invalid token"` - malformed or expired token
- `"User not found"` - user associated with token doesn't exist
- `"Token expired"` - JWT expiration time passed

### Simulated Delay

300ms

### Token Format

Tokens are mock JWT format (Base64 encoded):

```javascript
{
  "sub": "user_id",
  "email": "user@example.com",
  "name": "User Name",
  "iat": 1709000000,      // issued at
  "exp": 1709086400       // expires at (24 hours)
}
```

---

## Error Handling

All error responses follow this format:

```javascript
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token/credentials)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

---

## Rate Limiting (Simulated)

For production, implement these limits:

| Endpoint            | Limit | Window             |
| ------------------- | ----- | ------------------ |
| /api/signup         | 5     | Per hour per IP    |
| /api/login          | 10    | Per hour per IP    |
| /api/send-otp       | 3     | Per hour per email |
| /api/verify-otp     | 5     | Per hour per email |
| /api/reset-password | 3     | Per hour per email |

---

## Database Schema (Mock)

### Users Table

```javascript
{
  id: string,
  name: string,
  email: string,
  password: string,         // In prod: HASHED
  verified: boolean,
  createdAt: ISO8601,
  updatedAt: ISO8601,
  lastLogin: ISO8601
}
```

### OTP Table

```javascript
{
  email: string,
  code: string,             // 6-digit code
  expiresAt: timestamp,     // 10 minute validity
  attempts: number          // Max 5 attempts
}
```

### Sessions Table (Optional)

```javascript
{
  id: string,
  userId: string,
  token: string,
  expiresAt: timestamp,
  createdAt: ISO8601,
  userAgent: string,
  ipAddress: string
}
```

---

## Usage Examples

### Complete Signup Flow

```javascript
// 1. User signs up
const signupRes = await fetch("/api/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Jane Doe",
    email: "jane@example.com",
    password: "SecurePass123",
  }),
});

// 2. User verifies OTP
const verifyRes = await fetch("/api/verify-otp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "jane@example.com",
    otp: "123456", // User enters this
  }),
});
const { token } = await verifyRes.json();

// 3. User is now logged in
localStorage.setItem("token", token);
```

### Complete Password Recovery Flow

```javascript
// 1. User requests password reset
await fetch("/api/send-otp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "jane@example.com" }),
});

// 2. User verifies OTP
const verifyRes = await fetch("/api/verify-otp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "jane@example.com",
    otp: "654321", // User enters this
  }),
});

// 3. User sets new password
await fetch("/api/reset-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "jane@example.com",
    newPassword: "NewSecurePass456",
  }),
});

// 4. User can now login with new password
```

---

## Integration with Frontend

The frontend uses Zustand store to handle API calls:

```javascript
import { useAuthStore } from "@/store/authStore";

// In components
const { signup, login, logout } = useAuthStore();

// Call API actions
await signup({
  name: "John",
  email: "john@example.com",
  password: "pass123",
});
```

---

## Migrating to Real Backend

To use a real backend instead of mock API:

1. Remove `setupMockAPI()` from App.jsx
2. Update API URLs in authStore.js
3. Add proper error handling
4. Implement token refresh logic
5. Add request/response interceptors

Example:

```javascript
const API_BASE_URL = "https://api.yourbackend.com";

export const signup = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
};
```

---

**Last Updated**: March 2024
**API Version**: 1.0
**Status**: Production Ready (Mock)
