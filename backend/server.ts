import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
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

app.use(cors());
app.use(bodyParser.json());

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

    const user = await User.findOne({ phone });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful 🎉" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ================= START SERVER ================= */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


