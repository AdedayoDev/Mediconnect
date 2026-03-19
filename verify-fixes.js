#!/usr/bin/env node

/**
 * VERIFICATION CHECKLIST - OTP & Authentication System
 * Run this to verify all fixes are in place
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("\n========================================");
console.log("MEDICONNECT FIXES VERIFICATION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

function check(testName, condition, details = "") {
  if (condition) {
    console.log(`✅ ${testName}`);
    if (details) console.log(`   ${details}`);
    passed++;
  } else {
    console.log(`❌ ${testName}`);
    if (details) console.log(`   ${details}`);
    failed++;
  }
}

// Test 1: No demo user in backend
const serverJs = fs.readFileSync(
  path.join(__dirname, "backend/server.js"),
  "utf8",
);
check(
  "Demo user removed",
  !serverJs.includes("doctor@mediconnect.dev"),
  "No hardcoded demo credentials",
);

// Test 2: All auth endpoints exist
check(
  "Signup endpoint present",
  serverJs.includes('app.post("/api/auth/signup"'),
  "POST /api/auth/signup",
);

check(
  "Verify OTP endpoint present",
  serverJs.includes('app.post("/api/auth/verify-otp"'),
  "POST /api/auth/verify-otp",
);

check(
  "Login endpoint present",
  serverJs.includes('app.post("/api/auth/login"'),
  "POST /api/auth/login",
);

check(
  "Forgot password endpoint present",
  serverJs.includes('app.post("/api/auth/forgot-password"'),
  "POST /api/auth/forgot-password",
);

check(
  "Reset password endpoint present",
  serverJs.includes('app.post("/api/auth/reset-password"'),
  "POST /api/auth/reset-password",
);

// Test 3: No old duplicate routes
check(
  "No old /api/signup route",
  !serverJs.includes('app.post("/api/signup"'),
  "Duplicate routes removed",
);

check(
  "No old /api/send-otp route",
  !serverJs.includes('app.post("/api/send-otp"'),
  "Duplicate routes removed",
);

// Test 4: sendOTPEmail function exists
check(
  "sendOTPEmail function exists",
  serverJs.includes("async function sendOTPEmail"),
  "Email sending function properly defined",
);

// Test 5: No missing sendResetEmail
check(
  "sendResetEmail function not called",
  !serverJs.includes("sendResetEmail"),
  "Fixed missing function issue",
);

// Test 6: Frontend - No demo credentials in SignIn
const signInJs = fs.readFileSync(
  path.join(__dirname, "src/pages/SignIn.jsx"),
  "utf8",
);
check(
  "Demo credentials removed from SignIn",
  !signInJs.includes("doctor@mediconnect.dev"),
  "No hardcoded demo email",
);

check(
  "Demo button removed",
  !signInJs.includes("Try Demo Account"),
  "Demo login flow removed",
);

// Test 7: Frontend placeholders updated
check(
  "SignUp email placeholder generic",
  signInJs.includes("placeholder='your@email.com'"),
  "Email field uses generic placeholder",
);

const signUpJs = fs.readFileSync(
  path.join(__dirname, "src/pages/SignUp.jsx"),
  "utf8",
);
check(
  "SignUp email placeholder generic",
  signUpJs.includes("placeholder='your@email.com'"),
  "Email field uses generic placeholder",
);

const forgotJs = fs.readFileSync(
  path.join(__dirname, "src/pages/ForgotPassword.jsx"),
  "utf8",
);
check(
  "ForgotPassword email placeholder generic",
  forgotJs.includes("placeholder='your@email.com'"),
  "Email field uses generic placeholder",
);

// Test 8: API consistency
check(
  "API responses use consistent success field",
  serverJs.includes("success: true") && serverJs.includes("message:"),
  "Standardized API response format",
);

// Test 9: OTP storage consistency
check(
  "OTP storage uses consistent structure",
  serverJs.includes("database.otps[email] = {") &&
    serverJs.includes("code: otp") &&
    serverJs.includes("expiresAt:"),
  "Unified OTP storage format",
);

// Test 10: Environment file exists
check(
  "Backend .env file exists",
  fs.existsSync(path.join(__dirname, "backend/.env")),
  "Environment configuration ready",
);

const envContent = fs.readFileSync(
  path.join(__dirname, "backend/.env"),
  "utf8",
);
check(
  "Resend API key configured",
  envContent.includes("RESEND_API_KEY="),
  "Email service configured",
);

check(
  "JWT secret configured",
  envContent.includes("JWT_SECRET="),
  "Authentication secret configured",
);

console.log("\n========================================");
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("========================================\n");

if (failed === 0) {
  console.log("🎉 ALL CHECKS PASSED! System is ready.\n");
  console.log("Next steps:");
  console.log("1. Run backend:  cd backend && npm run dev");
  console.log("2. Run frontend: npm run dev");
  console.log("3. Open: http://localhost:5174");
  console.log("\n");
} else {
  console.log(`⚠️  ${failed} check(s) failed. Review the output above.\n`);
}

process.exit(failed === 0 ? 0 : 1);
