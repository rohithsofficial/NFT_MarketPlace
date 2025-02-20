import connectDB from "../../utils/db";
import Profile from "../../models/profile";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure 'uploads' folder exists
const uploadDir = path.resolve("public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    await connectDB();
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    upload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ error: "Error uploading file", details: err.message });
      }

      const { username, description, website, facebook, twitter, instagram, walletAddress } = req.body;
      let profilePicture = req.file ? `/uploads/${req.file.filename}` : "";

      const updatedProfile = await Profile.findOneAndUpdate(
        { user: userId },
        { username, description, website, facebook, twitter, instagram, walletAddress, profilePicture },
        { new: true, upsert: true }
      );

      res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Important for file uploads
  },
};
