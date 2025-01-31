// pages/api/upload-nft.js

import connectDB from "../../utils/db";  // Utility to connect to MongoDB
import NFT from "../../models/NFT";  // The NFT model to store data

export default async function handler(req, res) {
  // Connect to the database
  await connectDB();

  // Handle POST request
  if (req.method === "POST") {
    try {
      const {
        name,
        price,
        description,
        website,
        royalties,
        fileSize,
        category,
        properties,
        imageUrl,
      } = req.body;

      // Create a new NFT instance
      const newNFT = new NFT({
        name,
        price,
        description,
        website,
        royalties,
        fileSize,
        category,
        properties,
        imageUrl,
      });

      // Save the NFT data in the database
      await newNFT.save();

      // Respond with a success message
      res.status(201).json({ message: "NFT uploaded successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving NFT", error: err });
    }
  } else {
    // Handle other HTTP methods (only POST is expected in this case)
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
