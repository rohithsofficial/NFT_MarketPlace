const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;  // Getting URI from environment variable
    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = connectDB;
