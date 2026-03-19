/**
 * Real Backend API Service
 * Connects to Express backend at http://localhost:5000
 */

const API_BASE_URL = "http://localhost:5000/api";

// Utility: Handle API responses
async function handleResponse(response) {
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `API request failed (${response.status})`);
  }

  return data;
}

// Helper: Fetch with network-friendly errors
async function fetchJson(url, options) {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Network error: backend unavailable. Make sure backend is running at http://localhost:5000",
      );
    }
    throw error;
  }
}

/**
 * Sign Up - Create new user account
 */
export async function apiSignup(credentials) {
  return fetchJson(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

/**
 * Verify OTP - Verify email with OTP code
 */
export async function apiVerifyOTP(email, otp) {
  return fetchJson(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
}

/**
 * Login - Authenticate user
 */
export async function apiLogin(credentials) {
  return fetchJson(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

/**
 * Forgot Password - Request password reset
 */
export async function apiForgotPassword(email) {
  return fetchJson(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

/**
 * Reset Password - Complete password reset
 */
export async function apiResetPassword(email, otp, newPassword) {
  return fetchJson(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });
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
