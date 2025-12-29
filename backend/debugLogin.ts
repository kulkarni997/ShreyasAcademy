import mongoose from "mongoose";
import dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import User from "./models/User";

dotenv.config();

const debugLogin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shreyas"
    );
    console.log("✅ MongoDB connected\n");

    const email = "shreyasacademy2025@gmail.com";
    const testPassword = "Admin@123";

    // Fetch user WITH password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("❌ User not found in database!");
      console.log("Creating new admin account...\n");
      
      // Create fresh admin account
      const newAdmin = await User.create({
        name: "Shreyas Academy Admin",
        email: email,
        phone: "+91-9876543210",
        password: testPassword,
        role: "admin",
      });

      console.log("✅ New admin account created!");
      console.log("Please try logging in now.\n");
      mongoose.disconnect();
      return;
    }

    console.log("📋 Account Found:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Email:", user.email);
    console.log("Name:", user.name);
    console.log("Role:", user.role);
    console.log("Password (hash):", user.password);
    console.log("Hash length:", user.password?.length || 0);
    console.log("Is bcrypt hash?", user.password?.startsWith("$2b$") || user.password?.startsWith("$2a$"));
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    // Check if it's plain text (BIG PROBLEM)
    if (user.password === testPassword) {
      console.log("🚨 PASSWORD IS PLAIN TEXT! Pre-save hook didn't run!");
      console.log("Fixing now...\n");
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testPassword, salt);
      
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      console.log("✅ Password hashed and saved!");
      console.log("Try logging in again.\n");
      mongoose.disconnect();
      return;
    }

    // Test password comparison
    console.log("🔐 Testing password comparison:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    if (user.password) {
      try {
        const isMatch = await bcrypt.compare(testPassword, user.password);
        console.log(`Password "${testPassword}" matches:`, isMatch ? "✅ YES" : "❌ NO");
        
        if (!isMatch) {
          console.log("\n⚠️  Password doesn't match! Resetting...");
          
          // Reset password
          user.password = testPassword;
          await user.save();
          
          console.log("✅ Password reset complete!");
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          console.log("📧 Email:    shreyasacademy2025@gmail.com");
          console.log("🔑 Password: Admin@123");
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          console.log("\n✅ Try logging in now!\n");
        } else {
          console.log("\n✅ Password is correct!");
          console.log("The issue might be in your login route.\n");
          
          // Let's check the login logic
          console.log("🔍 Simulating login process:");
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          
          const loginUser = await User.findOne({ 
            email: email.trim().toLowerCase() 
          }).select("+password");
          
          console.log("User found in login:", !!loginUser);
          console.log("Password field exists:", !!loginUser?.password);
          
          if (loginUser && loginUser.password) {
            const loginMatch = await bcrypt.compare(testPassword, loginUser.password);
            console.log("Password comparison result:", loginMatch);
          }
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        }
      } catch (error) {
        console.error("❌ Bcrypt comparison error:", error);
      }
    }

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.disconnect();
  }
};

debugLogin();