import mongoose from 'mongoose';
import User from './models/User';
import dotenv from 'dotenv';

dotenv.config();

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shreyas");
    console.log("Connected to MongoDB");

    const users = await User.find({}, 'name email phone role').limit(10);
    console.log("\nUsers in database:");
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} - ${user.email} (${user.role})`);
    });

    if (users.length === 0) {
      console.log("No users found in database. You need to register first.");
    } else {
      console.log(`\nFound ${users.length} users. Use one of these emails for testing.`);
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

checkUsers();