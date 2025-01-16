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

  // Handle continue button click
  const handleClick = async () => {
    if (email && password) {
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
        } else {
          setSuccess(""); // Reset success message
          setError(data.error); // Error message from the backend
        }
      } catch (error) {
        setError("An error occurred. Please try again."); // Generic error message
        console.error("Error:", error);
      }
    } else {
      setError("Please fill in both email and password.");
    }
  };

  // const socialImage = [
  //   {
  //     social: images.facebook,
  //     name: "Continue with Facebook",
  //   },
  //   {
  //     social: images.twitter,
  //     name: "Continue with Twitter",
  //   },
  //   {
  //     social: images.google,
  //     name: "Continue with Google",
  //   },
  // ];

  return (
    <div className={Style.SignUp}>
      <div className={Style.SignUp_box}>
        <h1>Sign Up</h1>
        <div className={Style.user_box}>
          {/* <div className={Style.user_box_social}>
            {socialImage.map((el, i) => (
              <div
                key={i}
                onClick={() => setActiveBtn(i)}
                className={`${Style.user_box_social_item} ${
                  activeBtn === i ? Style.active : ""
                }`}
              >
                <Image
                  src={el.social}
                  alt={el.name}
                  width={30}
                  height={30}
                  className={Style.user_box_social_item_img}
                />
                <p>
                  <span>{el.name}</span>
                </p>
              </div>
            ))}
          </div>
          <p className={Style.user_box_or}>OR</p> */}
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
              <label
                htmlFor="password"
                className={Style.user_box_input_box_label}
              >
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
