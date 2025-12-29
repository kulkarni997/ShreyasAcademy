import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shreyas"
    );
    console.log("✅ MongoDB connected");

    const newPassword = "Admin@123"; // YOU CAN CHANGE THIS

    const user = await User.findOne({
      email: "shreyasacademy2025@gmail.com",
    });

    if (!user) {
      console.log("❌ Admin account not found! Please create it first.");
      mongoose.disconnect();
      return;
    }

    // Set new password (will be hashed by pre-save hook)
    user.password = newPassword;
    user.role = "admin"; // Ensure role is admin
    await user.save();

    console.log("\n🎉 Admin password reset successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:    shreyasacademy2025@gmail.com");
    console.log("🔑 Password:", newPassword);
    console.log("🎭 Role:     admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n🔒 Login at: http://localhost:5173/login\n");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.disconnect();
  }
};

resetAdminPassword();