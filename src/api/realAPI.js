/**
 * Real Backend API Service
 * Connects to Express backend at http://localhost:5000
 */

const API_BASE_URL = "http://localhost:5000/api";

// Utility: Handle API responses
async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "API request failed");
  }

  return data;
}

/**
 * Sign Up - Create new user account
 */
export async function apiSignup(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return handleResponse(response);
}

/**
 * Verify OTP - Verify email with OTP code
 */
export async function apiVerifyOTP(email, otp) {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  return handleResponse(response);
}

/**
 * Login - Authenticate user
 */
export async function apiLogin(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return handleResponse(response);
}

/**
 * Forgot Password - Request password reset
 */
export async function apiForgotPassword(email) {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return handleResponse(response);
}

/**
 * Reset Password - Complete password reset
 */
export async function apiResetPassword(email, otp, newPassword) {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });

  return handleResponse(response);
}

/**
 * Health Check - Verify backend is running
 */
export async function apiHealthCheck() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return { online: response.ok, status: data.status };
  } catch {
    return { online: false, status: "Backend offline" };
  }
}
