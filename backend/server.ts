import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import User from "./models/User";

dotenv.config();

/* ================= DB ================= */
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected 🟢"))
  .catch(console.error);

/* ================= APP ================= */
const app = express();
app.set("trust proxy", 1);

// Replace your current app.use(cors(...)) with this:
app.use(cors({
  origin: [
    "https://shreyas-academy.vercel.app", // Your exact Vercel URL
    process.env.FRONTEND_URL || ""         // Your env variable
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

/* ================= AUTH MIDDLEWARE ================= */
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.student_token; 
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    (req as any).user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

/* ================= ROUTES ================= */

// LOGIN
app.post("/login", async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    email = email.trim().toLowerCase();
    const user = await User.findOne({ email }).select("+password");
    
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("student_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });

    res.json({ message: "Login successful 🎉", role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
// SIGNUP ROUTE - SYNCED WITH SIGNUP.TSX
app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: phone.trim(), // ✅ FIXED: Changed from contactNumber to phone
      role: "student",
      weeklyMarks: [],
      biologyMarks: 0,
      physicsMarks: 0,
      chemistryMarks: 0,
      totalMarks: 0
    });

    await newUser.save();
    console.log("✅ Student registered successfully:", normalizedEmail);

    res.status(201).json({ message: "Account created successfully! Please login." });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
});

// LOGOUT
app.post("/logout", (_req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("student_token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
});

// STUDENT PROFILE
app.get("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: user.toObject() });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

/* ================= ADMIN ROUTES ================= */

// GET ALL STUDENTS
app.get("/admin/students", verifyToken, isAdmin, async (req, res) => {
  const students = await User.find({ role: "student" }).select("-password");
  res.json({ students });
});

// UPDATE MARKS
app.post("/admin/students/:id/marks", verifyToken, isAdmin, async (req, res) => {
  try {
    const { biologyMarks, physicsMarks, chemistryMarks, rank } = req.body;
    const totalMarks = Number(biologyMarks) + Number(physicsMarks) + Number(chemistryMarks);

    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.weeklyMarks.push({
      week: student.weeklyMarks.length + 1,
      date: new Date(),
      biologyMarks: Number(biologyMarks),
      physicsMarks: Number(physicsMarks),
      chemistryMarks: Number(chemistryMarks),
      totalMarks,
      rank: rank || 0 
    });

    student.biologyMarks = biologyMarks;
    student.physicsMarks = physicsMarks;
    student.chemistryMarks = chemistryMarks;
    student.totalMarks = totalMarks;

    await student.save();
    res.json({ message: "Marks added", student });
  } catch (error) {
    res.status(500).json({ message: "Server error adding marks" });
  }
});

// UPDATE STUDENT DETAILS / MENTOR
app.put("/admin/students/:id/mentor", verifyToken, isAdmin, async (req, res) => {
  try {
    const { mentorName, mentorContactNumber, rollNumber, plan } = req.body;
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { mentorName, mentorContactNumber, rollNumber, plan },
      { new: true }
    ).select("-password");

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student details updated", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating student details" });
  }
});

// MANUAL PASSWORD RESET BY ADMIN
app.put("/admin/students/:id/reset-password", verifyToken, isAdmin, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.password = password; // The User model pre-save hook will hash this
    await student.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
});

// DELETE STUDENT
app.delete("/admin/students/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.role === "admin") return res.status(403).json({ message: "Cannot delete admin" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: `Student ${student.name} removed successfully` });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student" });
  }
});

// PROMOTING TO ADMIN (SECURE)
app.post("/make-admin", verifyToken, async (req, res) => {
  try {
    const { email } = req.body;
    const requestingUser = await User.findById((req as any).user.userId);
    
    if (!requestingUser || email !== "shreyasacademy2025@gmail.com" || requestingUser.email !== email) {
      return res.status(403).json({ message: "Unauthorized promotion" });
    }

    const user = await User.findOneAndUpdate({ email }, { role: "admin" }, { new: true });
    res.json({ message: "Successfully promoted to admin! 🎉", role: user?.role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Shreyas Academy Backend is running! 🟢");
});

/* ================= START ================= */
app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});