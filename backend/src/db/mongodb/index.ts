import mongoose from "mongoose";

export const startMongoDB = async () => {
  const mongoUri = "mongodb://localhost:27017/wordly";

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};