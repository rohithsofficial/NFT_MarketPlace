import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import images from "../img/index.js"; // Ensure the correct path to your images
import Style from "../styles/login.module.css"; // Create a separate CSS module for styling
import { Button } from "../components/componentsindex.js";
import { useAuth } from "../context/AuthContext" ;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages
  const router = useRouter(); // Initialize router
  const { login } = useAuth();
  // Handle login button click
  const handleClick = async () => {
    if (email && password) {
      try {
        // Send login request to the backend
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
          login(data.token); // Save token to AuthContext
          setSuccess("Login successful!"); // Display success message
          setError(""); // Reset error message
          setEmail(""); // Clear email input
          setPassword(""); // Clear password input
          // Redirect to the homepage after successful login
          router.push("/");
        } else {
          setSuccess(""); // Reset success message
          setError(data.error); // Display error message
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
    <div className={Style.Login}>
      <div className={Style.Login_box}>
        <h1>Login</h1>
        <div className={Style.user_box}>
          {/* <div className={Style.user_box_social}>
            {socialImage.map((el, i) => (
              <div
                key={i}
                className={Style.user_box_social_item}
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
              <label htmlFor="password">Password</label>
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
            btnName="Login"
            classStyle={Style.button}
            handleClick={handleClick} // Passing handleClick to the button
          />
        </div>
        <p className={Style.Login_box_para}>
          Don't have an account? <a href="/signUp">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
