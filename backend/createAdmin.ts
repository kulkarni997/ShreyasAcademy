import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";

dotenv.config();

const createOrUpdateAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shreyas"
    );
    console.log("✅ MongoDB connected");

    // Check if admin already exists
    let user = await User.findOne({
      email: "shreyasacademy2025@gmail.com",
    });

    if (user) {
      // User exists, update to admin
      user.role = "admin";
      await user.save();
      console.log("\n🎉 Existing account updated to admin!");
    } else {
      // User doesn't exist, create new admin account
      const adminPassword = "Admin@123"; // CHANGE THIS!
      
      user = await User.create({
        name: "Shreyas Academy Admin",
        email: "shreyasacademy2025@gmail.com",
        phone: "+91-9876543210",
        password: adminPassword, // Will be hashed automatically
        role: "admin",
      });

      console.log("\n🎉 Admin account created successfully!");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📧 Email:    shreyasacademy2025@gmail.com");
      console.log("🔑 Password:", adminPassword);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }

    console.log("\n✅ Account Details:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:", user.email);
    console.log("👤 Name:", user.name);
    console.log("📱 Phone:", user.phone);
    console.log("🎭 Role:", user.role);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n🔒 Login at: http://localhost:5173/login");
    console.log("📊 Admin Dashboard: http://localhost:5173/admin\n");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.disconnect();
  }
};

createOrUpdateAdmin();