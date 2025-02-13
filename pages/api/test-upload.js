import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads folder exists
const uploadPath = path.resolve("public", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).single("profilePicture");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  upload(req, res, (err) => {
    if (err) {
      console.log("Multer error:", err);
      return res.status(400).json({ error: "File upload failed", details: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file received" });
    }

    console.log("File uploaded:", req.file);
    res.status(200).json({ message: "File uploaded successfully", filePath: "/uploads/" + req.file.filename });
  });
}
