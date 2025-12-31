import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "student" | "admin";
  plan?: "1 Month" | "6 Months" | "16 Months";
  rollNumber?: string;
  courseName?: string;
  courseStartDate?: string;
  courseEndDate?: string;
  mentorName?: string;
  mentorContactNumber?: string;

  weeklyMarks: Array<{
    week: number;
    date: Date;
    biologyMarks: number;
    physicsMarks: number;
    chemistryMarks: number;
    totalMarks: number;
    rank?: number; // Added here
  }>;

  biologyMarks?: number;
  physicsMarks?: number;
  chemistryMarks?: number;
  totalMarks?: number;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    rollNumber: String,
    courseName: String,
    courseStartDate: String,
    courseEndDate: String,
    mentorName: String,
    mentorContactNumber: String,
    plan: { type: String, enum: ["1 Month", "6 Months", "16 Months"], default: "1 Month" },

    weeklyMarks: [
      {
        week: Number,
        date: { type: Date, default: Date.now },
        biologyMarks: { type: Number, default: 0 },
        physicsMarks: { type: Number, default: 0 },
        chemistryMarks: { type: Number, default: 0 },
        totalMarks: { type: Number, default: 0 },
        rank: { type: Number, default: 0 }, // Added here to store in DB
      },
    ],

    biologyMarks: { type: Number, default: 0 },
    physicsMarks: { type: Number, default: 0 },
    chemistryMarks: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;