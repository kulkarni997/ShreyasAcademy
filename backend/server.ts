import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto from "crypto";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/User";

dotenv.config();

/* ================= DB ================= */
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shreyas")
  .then(() => console.log("MongoDB connected 🟢"))
  .catch((err) => console.error(err));

/* ================= APP ================= */
const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET =
  process.env.JWT_SECRET || "change-this-secret-in-production";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


/* ================= MIDDLEWARE ================= */
/* ✅ FIXED CORS – allow all localhost Vite ports */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* ================= HEALTH ================= */
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend running 🚀");
});

/* ================= SIGNUP ================= */
 app.post("/signup", async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 🔥 DO NOT HASH HERE
    await User.create({
      name,
      email,
      phone,
      password, // plain password
    });

    return res.status(201).json({ message: "Signup successful 🎉" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
});

/* ================= LOGIN ================= */
  app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  email = email.trim().toLowerCase();

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);
  res.cookie("student_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.json({ message: "Login successful 🎉" });
});

/* ================= AUTH ================= */
const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.student_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };

    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= PROFILE ================= */
app.get("/profile", verifyToken, async (req: Request, res: Response) => {
  const { userId } = (req as any).user;

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user });
});

/* ================= LOGOUT ================= */
app.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("student_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.json({ message: "Logged out successfully" });
});

// forgot password 
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "If account exists, mail sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Reset your Shreyas Academy password",
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// reset pw 
app.post("/reset-password/:token", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



/* ================= START ================= */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
