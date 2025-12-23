import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";
import User from "./models/User";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shreyas")
  .then(() => console.log("MongoDB connected 🟢"))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 5000;

// JWT secret key (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Configure CORS to allow credentials (cookies)
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL (adjust port if different)
    credentials: true, // Allow cookies to be sent
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

/* ================= HEALTH CHECK ================= */
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend running 🚀");
});

/* ================= SIGNUP ================= */
app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, phone, password, parentPhone } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, phone, password: hashedPassword });

    // Send SMS
    const sendSMS = async (number: string, message: string) => {
      await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          route: "v3",
          message,
          language: "english",
          numbers: number,
        },
        {
          headers: {
            authorization: process.env.FAST2SMS_API_KEY as string,
            "Content-Type": "application/json",
          },
        }
      );
    };

    try {
      await sendSMS(phone, `Hello ${name}, welcome to Shreyas Academy!`);

      if (parentPhone) {
        await sendSMS(
          parentPhone,
          `Your child ${name} registered at Shreyas Academy.`
        );
      }

      res.status(201).json({ message: "Signup successful 🎉" });
    } catch {
      res.status(201).json({
        message: "Signup successful (SMS failed)",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone number and password required" });
    }

    // Find user in database
    const user = await User.findOne({ phone });

    // Verify credentials
    // For testing: if no user found, use hardcoded check
    if (!user) {
      // Temporary hardcoded check for testing (remove in production)
      if (phone === "1234567890" && password === "password123") {
        // Generate JWT token
        const token = jwt.sign(
          { phone: phone, userId: "temp-user" },
          JWT_SECRET,
          { expiresIn: "7d" } // Token expires in 7 days
        );

        // Set HTTP-only cookie
        res.cookie("student_token", token, {
          httpOnly: true, // Cookie cannot be accessed by JavaScript
          secure: false, // Set to true in production with HTTPS
          sameSite: "lax", // CSRF protection
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        });

        return res.json({ message: "Login successful 🎉" });
      }
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password for database user
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user data
    const token = jwt.sign(
      { phone: user.phone, userId: user._id.toString() },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set HTTP-only cookie named "student_token"
    res.cookie("student_token", token, {
      httpOnly: true, // Prevents JavaScript access (security)
      secure: false, // false for localhost, true for HTTPS in production
      sameSite: "lax", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: "Login successful 🎉" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ================= PROTECTED ROUTE EXAMPLE ================= */
// Middleware to verify JWT token from cookie
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get token from cookie
  const token = req.cookies.student_token;

  if (!token) {
    return res.status(401).json({ message: "No token provided. Please log in." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { phone: string; userId: string };
    
    // Attach user info to request object
    (req as any).user = decoded;
    
    // Continue to next middleware/route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
  }
};

// Example protected route - only accessible with valid cookie
app.get("/profile", verifyToken, (req: Request, res: Response) => {
  // User info is available from verifyToken middleware
  const user = (req as any).user;
  
  res.json({
    message: "Protected route accessed successfully!",
    user: {
      phone: user.phone,
      userId: user.userId,
    },
  });
});

/* ================= LOGOUT ================= */
app.post("/logout", (req: Request, res: Response) => {
  // Clear the cookie
  res.clearCookie("student_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  
  res.json({ message: "Logged out successfully" });
});

/* ================= START SERVER ================= */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


