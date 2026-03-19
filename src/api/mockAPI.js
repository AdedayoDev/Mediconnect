/**
 * Mock API Service - Simulates backend API calls with realistic delays
 * This provides a complete authentication backend simulation for testing
 */

// In-memory database for demo purposes
const mockDatabase = {
  users: [
    {
      id: "1",
      name: "John Demo",
      email: "demo@example.com",
      password: "Demo@123", // In real app, this would be hashed
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Jane Dev",
      email: "jane@example.com",
      password: "Test@123",
      verified: true,
      createdAt: new Date().toISOString(),
    },
  ],
  otps: {}, // { email: { code: '123456', expiresAt: timestamp } }
};

// Mock JWT token generator (not real JWT, just for demo)
function generateMockToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
  };
  return btoa(JSON.stringify(payload));
}

// Generate random OTP
function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// Simulate API delay
function simulateDelay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Signup endpoint
 * POST /api/signup
 */
export async function handleSignup(req) {
  await simulateDelay(1200);

  const { name, email, password } = req.body || req;

  // Validation
  if (!email || !password || !name) {
    throw new Error("Missing required fields");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // Check if user exists
  const existingUser = mockDatabase.users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Create new user
  const newUser = {
    id: String(Date.now()),
    name,
    email,
    password, // In real app, hash this
    verified: false,
    createdAt: new Date().toISOString(),
  };

  mockDatabase.users.push(newUser);

  // Generate OTP
  const otp = generateOTP();
  mockDatabase.otps[email] = {
    code: otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  };

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    message: `OTP sent to ${email}. Use OTP: ${otp}`, // Demo only!
  };
}

/**
 * Login endpoint
 * POST /api/login
 */
export async function handleLogin(req) {
  await simulateDelay(1000);

  const { email, password } = req.body || req;

  // Validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Find user
  const user = mockDatabase.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.verified) {
    throw new Error("Email not verified. Please verify your email first.");
  }

  // Generate token
  const token = generateMockToken(user);

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

/**
 * Send OTP endpoint (Forgot Password)
 * POST /api/send-otp
 */
export async function handleSendOTP(req) {
  await simulateDelay(800);

  const { email } = req.body || req;

  if (!email) {
    throw new Error("Email is required");
  }

  // Check if user exists
  const user = mockDatabase.users.find((u) => u.email === email);
  if (!user) {
    throw new Error("User not found");
  }

  // Generate OTP
  const otp = generateOTP();
  mockDatabase.otps[email] = {
    code: otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  };

  return {
    success: true,
    message: `OTP sent to ${email}. Use OTP: ${otp}`, // Demo only!
  };
}

/**
 * Verify OTP endpoint
 * POST /api/verify-otp
 */
export async function handleVerifyOTP(req) {
  await simulateDelay(900);

  const { email, otp } = req.body || req;

  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  const otpData = mockDatabase.otps[email];

  if (!otpData) {
    throw new Error("No OTP found for this email");
  }

  if (otpData.expiresAt < Date.now()) {
    delete mockDatabase.otps[email];
    throw new Error("OTP expired");
  }

  if (otpData.code !== otp) {
    throw new Error("Invalid OTP");
  }

  // Mark user as verified or mark as ready for password reset
  const user = mockDatabase.users.find((u) => u.email === email);
  if (!user.verified) {
    user.verified = true;
  }

  // Clear OTP
  delete mockDatabase.otps[email];

  // Generate token
  const token = generateMockToken(user);

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

/**
 * Reset password endpoint
 * POST /api/reset-password
 */
export async function handleResetPassword(req) {
  await simulateDelay(1100);

  const { email, newPassword } = req.body || req;

  if (!email || !newPassword) {
    throw new Error("Email and new password are required");
  }

  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const user = mockDatabase.users.find((u) => u.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  // Update password
  user.password = newPassword;

  return {
    success: true,
    message: "Password reset successfully",
  };
}

/**
 * Get user endpoint
 * GET /api/user
 */
export async function handleGetUser(token) {
  await simulateDelay(300);

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    // Decode mock JWT
    const payload = JSON.parse(atob(token));

    // Check expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Token expired");
    }

    const user = mockDatabase.users.find((u) => u.id === payload.sub);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  } catch {
    throw new Error("Invalid token");
  }
}

/**
 * Mock API interceptor - Routes API calls to appropriate handlers
 */
export function setupMockAPI() {
  const originalFetch = window.fetch;

  window.fetch = function (...args) {
    const [url, options = {}] = args;
    const method = options.method || "GET";
    const body = options.body ? JSON.parse(options.body) : null;

    // Handle API routes
    if (url.includes("/api/")) {
      return new Promise((resolve) => {
        setTimeout(async () => {
          try {
            let data;

            if (url.includes("/api/signup") && method === "POST") {
              data = await handleSignup({ body });
            } else if (url.includes("/api/login") && method === "POST") {
              data = await handleLogin({ body });
            } else if (url.includes("/api/send-otp") && method === "POST") {
              data = await handleSendOTP({ body });
            } else if (url.includes("/api/verify-otp") && method === "POST") {
              data = await handleVerifyOTP({ body });
            } else if (
              url.includes("/api/reset-password") &&
              method === "POST"
            ) {
              data = await handleResetPassword({ body });
            } else if (url.includes("/api/user") && method === "GET") {
              const token = options.headers?.Authorization?.replace(
                "Bearer ",
                "",
              );
              data = await handleGetUser(token);
            } else {
              throw new Error("API route not found");
            }

            resolve(
              new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }),
            );
          } catch (error) {
            resolve(
              new Response(
                JSON.stringify({
                  success: false,
                  error: error.message,
                }),
                {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
                },
              ),
            );
          }
        }, 0);
      });
    }

    // Pass through non-API calls to original fetch
    return originalFetch.apply(this, args);
  };
}

// Export mock database users for testing
export const testUsers = [
  {
    email: "demo@example.com",
    password: "Demo@123",
    name: "John Demo",
  },
  {
    email: "jane@example.com",
    password: "Test@123",
    name: "Jane Dev",
  },
];
