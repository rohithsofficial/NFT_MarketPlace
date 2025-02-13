import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import images from "../img"; // Ensure the correct path to your images
import Style from "../styles/signUp.module.css"; 

import { Button } from "../components/componentsindex.js";

const SignUp = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling
  const [success, setSuccess] = useState(""); // For success messages
  const router = useRouter(); // Initialize router

  // Email format validation using regex
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle continue button click
  const handleClick = async () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // Perform backend request to the signup API
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccess(data.message); // Success message from the backend
        setError(""); // Reset error message
        setEmail(""); // Clear email input
        setPassword(""); // Clear password input

        // Navigate to login page after successful signup
        router.push("/login");
      } else if (response.status === 400) {
        // If the email already exists in the database, notify and redirect to login
        setSuccess("");
        setError("Email already exists. Please login.");
        setTimeout(() => {
          router.push("/login");
        }, 2000); // Redirect after 2 seconds
      } else {
        setSuccess(""); // Reset success message
        setError(data.error); // Error message from the backend
      }
    } catch (error) {
      setError("An error occurred. Please try again."); // Generic error message
      console.error("Error:", error);
    }
  };

  return (
    <div className={Style.SignUp}>
      <div className={Style.SignUp_box}>
        <h1>Sign Up</h1>
        <div className={Style.user_box}>
          <div className={Style.user_box_input}>
            <div className={Style.user_box_input_box}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={Style.user_box_input_box}>
              <label htmlFor="password" className={Style.user_box_input_box_label}>
                <p>Password</p>
                <p>
                  <a href="#"></a>
                </p>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Display error or success message */}
          {error && <p className={Style.error}>{error}</p>}
          {success && <p className={Style.success}>{success}</p>}

          <Button
            btnName="Continue"
            classStyle={Style.button}
            handleClick={handleClick} // Passing handleClick to the button
          />
        </div>
        <p className={Style.SignUp_box_para}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
