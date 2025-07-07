import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URL;

  if (!uri) {
    console.error("❌ MONGODB_URL is not defined in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // stop the server if DB connection fails
  }
};
