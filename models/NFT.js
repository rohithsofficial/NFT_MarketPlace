// models/NFT.js

import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  website: String,
  royalties: String,
  fileSize: String,
  category: String,
  properties: String,
  imageUrl: String,
}, { timestamps: true });

export default mongoose.models.NFT || mongoose.model("NFT", nftSchema);
