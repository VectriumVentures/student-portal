const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const createDefaultAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    
    if (existingAdmin) {
      console.log("ℹ️  Admin user already exists:");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.name}`);
      console.log(`   Created: ${existingAdmin.createdAt}`);
      return;
    }

    // Create default admin user
    const adminData = {
      name: "System Administrator",
      email: "admin@crmportal.com",
      password: "admin123", // This will be hashed by the pre-save middleware
      role: "admin",
      phone: "+1234567890",
      isActive: true,
    };

    const admin = new User(adminData);
    await admin.save();

    console.log("🎉 Default admin user created successfully!");
    console.log("📧 Email: admin@crmportal.com");
    console.log("🔑 Password: admin123");
    console.log("⚠️  Please change the default password after first login!");

  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
};

// Run the script
createDefaultAdmin();
