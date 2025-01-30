import React, { useState } from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

// INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
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
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          {/* <Image src={images.logo} alt="footer logo" height={100} width={100} /> */}
          <a href="/">
            <DiJqueryLogo className={Style.footer_box_social_logo} />
          </a>
          <p>
            The world’s first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>

          <div className={Style.footer_social}>
            <a href="#"><TiSocialFacebook /></a>
            <a href="#"><TiSocialLinkedin /></a>
            <a href="#"><TiSocialTwitter /></a>
            <a href="#"><TiSocialYoutube /></a>
            <a href="#"><TiSocialInstagram /></a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>

          <div className={Style.subscribe_box}>
            <input
              type="email"
              placeholder="Enter your email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <RiSendPlaneFill
              className={Style.subscribe_box_send}
              onClick={handleSubscribe}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* Success/Error Message */}
          {message && <p className={Style.subscribe_message}>{message}</p>}

          <div className={Style.subscribe_box_info}>
            <p>
              Discover, collect, and sell extraordinary NFTs. OpenSea is the
              world's first and largest NFT marketplace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
