import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto from "crypto";
import nodemailer from "nodemailer";
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

const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

/* ================= MAIL ================= */
// let transporter: nodemailer.Transporter | null = null;
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // This MUST be a 16-character App Password
  },
  tls: {
    // This critical setting prevents handshake timeouts on cloud servers
    rejectUnauthorized: false 
  }
});

// Verify the connection once on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email SMTP Error:", error.message);
  } else {
    console.log("✅ Email Server is ready to send messages");
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    console.log("🔵 LOGIN REQUEST RECEIVED");
    console.log("Email received:", JSON.stringify(email));
    console.log("Password received:", JSON.stringify(password));
    console.log("Password length:", password?.length);
    console.log("Password bytes:", Buffer.from(password || '').toString('hex'));

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Trim and normalize email
    email = email.trim().toLowerCase();

    console.log("Login attempt for:", email);

    // Find user and explicitly select password field
    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ User found, checking password...");
    console.log("Stored hash:", user.password);

    // Ensure password field exists
    if (!user.password) {
      console.error("❌ Password field missing for user:", email);
      return res.status(500).json({ message: "Account error. Please contact support." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log("🔐 Password match result:", isMatch);

    // TEMPORARY DEBUG: Also try with trimmed password
    if (!isMatch) {
      const trimmedMatch = await bcrypt.compare(password.trim(), user.password);
      console.log("🔐 Trimmed password match:", trimmedMatch);
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // res.cookie("student_token", token, {
    //   httpOnly: true,
    //   sameSite: "lax",
    // });

    const isProd = process.env.NODE_ENV === "production";

res.cookie("student_token", token, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
});


    console.log("✅ Login successful for:", email, "Role:", user.role);

    res.json({ 
      message: "Login successful 🎉", 
      role: user.role
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
});
/* ================= AUTH ================= */
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.student_token;
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

app.get("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Simply return the user object. 
    // The weeklyMarks array contains everything the student needs.
    res.json({
      user: user.toObject()
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});


/* ================= ADMIN: GET ALL STUDENTS ================= */
app.get("/admin/students", verifyToken, isAdmin, async (req, res) => {
  const students = await User.find({ role: "student" }).select("-password");
  res.json({ students });
});
/* ================= ADMIN: UPDATE MARKS ================= */
app.post("/admin/students/:id/marks", verifyToken, isAdmin, async (req, res) => {
  try {
    const { biologyMarks, physicsMarks, chemistryMarks, rank } = req.body;
    const totalMarks = Number(biologyMarks) + Number(physicsMarks) + Number(chemistryMarks);

    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const nextWeek = student.weeklyMarks.length + 1;

    student.weeklyMarks.push({
      week: nextWeek,
      date: new Date(),
      biologyMarks: Number(biologyMarks),
      physicsMarks: Number(physicsMarks),
      chemistryMarks: Number(chemistryMarks),
      totalMarks,
      rank: rank || 0 
    });

    // Update latest summary totals
    student.biologyMarks = biologyMarks;
    student.physicsMarks = physicsMarks;
    student.chemistryMarks = chemistryMarks;
    student.totalMarks = totalMarks;

    await student.save();
    res.json({ message: `Week ${nextWeek} marks added`, student });
  } catch (error) {
    console.error("Error adding marks:", error);
    res.status(500).json({ message: "Server error adding marks" });
  }
});
  // Add this endpoint after the existing /admin/students/:id/marks endpoint
app.put("/admin/students/:id/mentor", verifyToken, isAdmin, async (req, res) => {
  try {
    const { mentorName, mentorContactNumber, rollNumber, plan } = req.body;
    
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { 
        mentorName,
        mentorContactNumber,
        rollNumber, // Save new roll number
        plan // Save new plan
      },
      { new: true }
    ).select("-password");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student details updated", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating student details" });
  }
});

/* ================= FORGOT PASSWORD ================= */
app.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      // Don't reveal if user exists for security
      return res.json({ message: "If account exists, a reset link has been sent to your email" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    user.resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await user.save();

    // Default to common Vite dev server port
    const frontendUrl = process.env.FRONTEND_URL;
    const resetLink = `${frontendUrl}/reset-password/${token}`;

    console.log(`\n🔗 RESET LINK: ${resetLink}\n`);

    // Try to send email if transporter is configured
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Shreyas Academy" <${process.env.EMAIL}>`,
          to: user.email,
          subject: "Reset your Shreyas Academy password",
          html: `
            <h2>Password Reset</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
          `,
        });

        return res.json({ message: "Reset link sent to your email" });
      } catch (mailError: any) {
        console.error("Email sending error:", mailError.message);
        // Log the reset link in development mode
        if (process.env.NODE_ENV !== "production") {
          console.log("\n📧 RESET LINK (Email not configured):");
          console.log(`   ${resetLink}\n`);
        }
        // Still return success to user for security
        return res.json({ 
          message: "Reset link generated. Check your email or contact support if you don't receive it.",
          // In development, include the link (remove in production)
          ...(process.env.NODE_ENV !== "production" && { resetLink })
        });
      }
    } else {
      // Email transporter not configured
      if (process.env.NODE_ENV !== "production") {
        console.log("\n📧 RESET LINK (Email not configured):");
        console.log(`   ${resetLink}\n`);
        return res.json({ 
          message: "Reset link generated. Check console for the link (development mode).",
          resetLink 
        });
      } else {
        // In production, don't expose the link
        return res.json({ 
          message: "Reset link has been generated. Please contact support if you don't receive an email." 
        });
      }
    }
  } catch (err: any) {
    console.error("Forgot password error:", err);
    // Provide more specific error messages
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (err.name === "MongoError" || err.name === "MongoServerError") {
      return res.status(500).json({ message: "Database error. Please try again later." });
    }
    return res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

/* ================= RESET PASSWORD ================= */
 /* ================= RESET PASSWORD ================= */
app.post("/reset-password/:token", async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    // Basic validation
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Hash the token from URL to compare with DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // Find user with valid token and not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired link" });
    }

    // ✅ IMPORTANT: set password as PLAIN TEXT
    // pre-save hook in User.ts will hash it
    user.password = password;

    // Mark password as modified since it was not selected during find
    user.markModified('password');

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save user (this triggers pre-save hashing)
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= MAKE ADMIN (SECURE) ================= */
app.post("/make-admin", verifyToken, async (req, res) => {
  try {
    const { email } = req.body;

    // Get the requesting user's email from token
    const requestingUser = await User.findById((req as any).user.userId);
    
    if (!requestingUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Only allow the specific academy email to become admin
    if (email !== "shreyasacademy2025@gmail.com") {
      return res.status(403).json({ 
        message: "Only authorized emails can become admin" 
      });
    }

    // Ensure the requesting user is promoting themselves
    if (requestingUser.email !== email) {
      return res.status(403).json({ 
        message: "You can only promote yourself" 
      });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ 
      message: "Successfully promoted to admin! 🎉", 
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Make admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/logout", (_req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  // res.clearCookie("student_token", {
  //   httpOnly: true,
  //   secure: isProd,
  //   sameSite: isProd ? "none" : "lax",
  // });

  res.clearCookie("student_token", {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
});



  res.json({ message: "Logged out successfully" });
});


/* ================= ADMIN: DELETE STUDENT ================= */
app.delete("/admin/students/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Prevent deleting admin accounts
    if (student.role === "admin") {
      return res.status(403).json({ message: "Cannot delete admin accounts" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ 
      message: `Student ${student.name} has been removed successfully`,
      deletedStudent: {
        name: student.name,
        email: student.email
      }
    });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({ message: "Failed to delete student" });
  }
});

// TEMPORARY DEBUG ENDPOINT - Remove after fixing
app.get("/debug-admin", async (req, res) => {
  const user = await User.findOne({ 
    email: "shreyasacademy2025@gmail.com" 
  }).select("+password");
  
  if (!user) {
    return res.json({ error: "User not found" });
  }

  res.json({
    email: user.email,
    role: user.role,
    passwordHash: user.password,
    passwordLength: user.password.length
  });
});

/* ================= START ================= */
app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});