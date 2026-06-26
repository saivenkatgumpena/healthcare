import mongoose from "mongoose";
import { User } from "./models/userSchema.js";
import dotenv from "dotenv";

dotenv.config({ path: "./my.env" });

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("MONGO_URI is missing in my.env. Please make sure MONGO_URI is set in backend/my.env!");
      return;
    }
    
    await mongoose.connect(mongoUri, {
      dbName: "hms_deployed",
    });
    console.log("Connected to MongoDB database.");

    // Remove existing admin with same email to avoid duplicates
    await User.deleteMany({ email: "admin@gmail.com" });

    // Create Admin
    const admin = await User.create({
      firstName: "System",
      lastName: "Admin",
      email: "admin@gmail.com",
      phone: "9999999999",
      nic: "9999999999999",
      dob: new Date("1990-01-01"),
      gender: "Male",
      password: "adminpassword123", // Will be hashed automatically
      role: "Admin",
    });

    console.log("-----------------------------------------");
    console.log("ADMIN CREATED SUCCESSFULLY!");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: adminpassword123`);
    console.log("-----------------------------------------");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding admin:", error);
    mongoose.connection.close();
  }
};

seedAdmin();
