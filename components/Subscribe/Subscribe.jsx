import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./Subscribe.module.css";
import images from "../../img";

const Subscribe = () => {
  const [email, setEmail] = useState(""); // Track input value
  const [message, setMessage] = useState(""); // Store success/error message

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("⚠️ Please enter your email!");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Subscribed successfully!");
        setEmail(""); // Clear input field after success
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Subscription Error:", error);
      setMessage("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>Never miss a drop</h2>
          <p>Subscribe to our super-exclusive drop list and be the first to know about upcoming drops.</p>
          
          <div className={Style.subscribe_box_left_box}>
            <span>01</span>
            <small>Get more discount</small>
          </div>

          <div className={Style.subscribe_box_left_box}>
            <span>02</span>
            <small>Get premium magazines</small>
          </div>

          {/* Input Field */}
          <div className={Style.subscribe_box_left_input}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <RiSendPlaneFill
              className={Style.subscribe_box_left_input_icon}
              onClick={handleSubscribe}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* Success/Error Message */}
          {message && <p className={Style.subscribe_message}>{message}</p>}
        </div>

        <div className={Style.subscribe_box_right}>
          <Image
            src={images.update}
            alt="get update"
            height={600}
            width={800}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
