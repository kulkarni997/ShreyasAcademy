import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User";

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shreyas")
  .then(() => console.log("MongoDB connected 🟢"))
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.post("/test", (req, res) => {
  console.log("Test route called:", req.body);
  res.json({ message: "Test successful" });
});

app.post("/forgot-password", async (req, res) => {
  console.log("🚨 FORGOT PASSWORD ROUTE CALLED!");
  try {
    const { email } = req.body;
    console.log("Email:", email);

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    console.log("User found:", !!user);

    res.json({ message: "If account exists, a reset link has been sent to your email" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});