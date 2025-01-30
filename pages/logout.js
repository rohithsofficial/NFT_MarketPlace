// pages/logout.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear authentication data (example: removing from localStorage)
    localStorage.removeItem("authToken");

    // Redirect to login page
    router.push("/login");
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
