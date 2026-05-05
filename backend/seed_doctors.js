import mongoose from "mongoose";
import { User } from "./models/userSchema.js";
import dotenv from "dotenv";

dotenv.config({ path: "./my.env" });

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM_DEPLOYED",
    });
    console.log("Connected to database.");

    // Remove old placeholder doctors if any
    await User.deleteMany({ email: { $in: ["sarah@example.com", "john@example.com", "doctorsarah618@gmail.com", "doctorsmith1432@gmail.com"] } });

    // Insert Dr. Sarah
    const doctorLady = await User.create({
      firstName: "Sarah",
      lastName: "Jones",
      email: "doctorsarah618@gmail.com",
      phone: "1111111111", // Exactly 10 digits required by schema
      nic: "1111111111111",   // Exact 13 digits required by schema
      dob: new Date("1985-05-15"),
      gender: "Female",
      password: "password123", // Will be hashed by pre-save hook
      role: "Doctor",
      doctorDepartment: "Pediatrics",
      docAvatar: {
        public_id: "dummy",
        url: "https://via.placeholder.com/150",
      },
    });

    // Insert Dr. John
    const doctorMan = await User.create({
      firstName: "John",
      lastName: "Smith",
      email: "doctorsmith1432@gmail.com",
      phone: "2222222222",
      nic: "2222222222222",
      dob: new Date("1980-10-20"),
      gender: "Male",
      password: "password123",
      role: "Doctor",
      doctorDepartment: "Pediatrics",
      docAvatar: {
        public_id: "dummy",
        url: "https://via.placeholder.com/150",
      },
    });

    console.log("Doctors seeded successfully!");
    console.log(`Lady Doctor: ${doctorLady.email}`);
    console.log(`Man Doctor: ${doctorMan.email}`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding doctors:", error);
    mongoose.connection.close();
  }
};

seedDoctors();
