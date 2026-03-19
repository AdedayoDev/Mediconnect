import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import process from "node:process";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Create nodemailer transporter for testing
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "test@example.com",
    pass: process.env.EMAIL_PASS || "testpass",
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Simple file-backed database so data survives restarts
// For production you would replace this with PostgreSQL, MongoDB, etc.
import fs from "node:fs";
import path from "node:path";

const DB_FILE = path.join(process.cwd(), "db.json");

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to read database file, starting fresh:", err.message);
  }
  return { users: [], otps: {}, resetTokens: {} };
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2));
  } catch (err) {
    console.error("Failed to save database file:", err.message);
  }
}

const database = loadDatabase();

// Initialize database
async function initDatabase() {
  console.log("Database initialized - ready for user registrations");
}

// Utility: Generate OTP
function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// Utility: Generate JWT
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );
}

// Utility: Send OTP Email via Resend
async function sendOTPEmail(email, otp, userName = "User") {
  // Always log OTP to console for development
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📧 OTP for ${email}:`);
  console.log(`🔐 OTP CODE: ${otp}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  try {
    console.log(`📧 Attempting to send OTP email to ${email}...`);

    const { data, error } = await resend.emails.send({
      from: "MediConnect <onboarding@resend.dev>",
      to: [email],
      subject: "MediConnect: Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">MediConnect</h1>
          </div>
          <div style="padding: 30px; background: #f5f5f5;">
            <h2>Hello ${userName},</h2>
            <p style="font-size: 16px; color: #333;">Your OTP code for email verification is:</p>
            <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #667eea; letter-spacing: 5px; margin: 0;">${otp}</h1>
            </div>
            <p style="font-size: 14px; color: #666;">This code expires in <strong>10 minutes</strong>.</p>
            <p style="font-size: 14px; color: #666;">If you didn't request this code, please ignore this email.</p>
          </div>
          <div style="background: #333; color: white; text-align: center; padding: 15px; font-size: 12px;">
            <p>© 2026 MediConnect. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      console.log("⚠️ Email failed, but OTP is logged above for development");
      return { id: "dev-mock-" + Date.now(), status: "console-logged" };
    }

    console.log(`✅ OTP sent successfully to ${email}:`, data);
    return data;
  } catch (error) {
    console.error(
      `❌ Failed to send OTP via Resend to ${email}:`,
      error.message,
    );
    console.log("⚠️ Email failed, but OTP is logged above for development");
    // Return mock response for development
    return { id: "dev-mock-" + Date.now(), status: "console-logged" };
  }
}

// ENDPOINT: Sign Up
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, userType = "patient" } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    // Check if user exists
    const existingUser = database.users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: String(Date.now()),
      name,
      email,
      password: hashedPassword,
      userType, // 'patient' or 'doctor'
      verified: false,
      createdAt: new Date().toISOString(),
    };

    database.users.push(newUser);
    saveDatabase();

    // Generate and send OTP
    const otp = generateOTP();
    database.otps[email] = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    };
    saveDatabase();

    await sendOTPEmail(email, otp, name.split(" ")[0]);

    // Prepare response
    const response = {
      success: true,
      message: "Signup successful. OTP sent to email.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
      },
    };

    // In development mode, include OTP in response for UI alert
    if (process.env.NODE_ENV !== "production") {
      response.otp = otp;
      response.message = "Signup successful. Check the alert for your OTP code.";
    }

    res.status(201).json(response);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ENDPOINT: Verify OTP
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP required" });
    }

    // Check OTP
    const storedOTP = database.otps[email];
    if (!storedOTP) {
      return res
        .status(400)
        .json({ error: "OTP not found. Please signup again." });
    }

    if (Date.now() > storedOTP.expiresAt) {
      delete database.otps[email];
      return res.status(400).json({ error: "OTP expired" });
    }

    if (storedOTP.code !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Mark user as verified
    const user = database.users.find((u) => u.email === email);
    if (user) {
      user.verified = true;
    }

    // Clean up OTP
    delete database.otps[email];
    saveDatabase();

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        verified: true,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ENDPOINT: Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = database.users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.verified) {
      return res
        .status(403)
        .json({ error: "Email not verified. Please verify first." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        verified: true,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ENDPOINT: Forgot Password
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const user = database.users.find((u) => u.email === email);
    if (!user) {
      // Don't leak whether email exists
      return res.json({
        success: true,
        message: "If email exists, reset OTP will be sent",
      });
    }

    const otp = generateOTP();
    database.resetTokens[email] = {
      code: otp,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
    };
    saveDatabase();

    // Send OTP email
    await sendOTPEmail(email, otp, user.name.split(" ")[0]);

    // Prepare response
    const response = {
      success: true,
      message: "Reset OTP sent to email",
    };

    // In development mode, include OTP in response for UI alert
    if (process.env.NODE_ENV !== "production") {
      response.otp = otp;
      response.message = "Reset OTP sent. Check the alert for your code.";
    }

    res.json(response);
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ENDPOINT: Reset Password
app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ error: "Email, OTP, and new password required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    const storedOTP = database.resetTokens[email];
    if (!storedOTP) {
      return res.status(400).json({ error: "No reset request found" });
    }

    if (Date.now() > storedOTP.expiresAt) {
      delete database.resetTokens[email];
      return res.status(400).json({ error: "Reset token expired" });
    }

    if (storedOTP.code !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const user = database.users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    delete database.resetTokens[email];

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ENDPOINT: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "MediConnect backend running ✓" });
});

// Start server
const PORT = process.env.PORT || 5000;

(async () => {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`🏥 MediConnect Backend running on http://localhost:${PORT}`);
  });
})();
