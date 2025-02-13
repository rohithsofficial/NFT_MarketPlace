import React, { useState } from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";

// INTERNAL IMPORT
import withAuthProtection from "../utils/withAuth";
import Style from "../styles/contactus.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

const ContactUs = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState(""); // Message state
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(""); // Clear previous message

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusType("success");
        setStatusMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatusType("error");
        setStatusMessage(data.error || "Error sending email. Try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusType("error");
      setStatusMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={Style.contactus}>
      <div className={Style.contactus_box}>
        <h1>Contact</h1>
        <div className={Style.contactus_box_box}>
          {/* Left Side */}
          <div className={Style.contactus_box_box_left}>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🗺 ADDRESS</h3>
              <p>Mangalore, Karnataka, India</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>💌 EMAIL</h3>
              <p>support@nftverse.com</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>☎ PHONE</h3>
              <p>+91 91485 92177</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🌏 SOCIALS</h3>
              <a href="#"><TiSocialFacebook /></a>
              <a href="#"><TiSocialLinkedin /></a>
              <a href="#"><TiSocialInstagram /></a>
              <a href="#"><TiSocialYoutube /></a>
              <a href="#"><TiSocialTwitter /></a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={Style.contactus_box_box_right}>
            <form onSubmit={handleSubmit}>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className={formStyle.Form_box_input_userName}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  cols="30"
                  rows="6"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <Button btnName="Send Message" type="submit" classStyle={Style.button} />
            </form>

            {/* Display Message Below Form */}
            {statusMessage && (
              <p className={statusType === "success" ? Style.successMessage : Style.errorMessage}>
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthProtection(ContactUs);
