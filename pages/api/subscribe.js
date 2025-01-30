import connectDB from "../../utils/db"; // Reusing existing DB connection
import Subscriber from "../../models/Subscriber";

export default async function handler(req, res) {
  await connectDB(); // Ensure DB connection

  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address." });
    }

    try {
      const existingSubscriber = await Subscriber.findOne({ email });
      if (existingSubscriber) {
        return res.status(409).json({ success: false, message: "Email already subscribed." });
      }

      const newSubscriber = new Subscriber({ email });
      await newSubscriber.save();

      return res.status(201).json({ success: true, message: "Subscription successful!" });
    } catch (error) {
      console.error("Subscription error:", error);
      return res.status(500).json({ success: false, message: "Server error. Try again." });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
