import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownload, TbLogout } from "react-icons/tb";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

// Import the useAuth hook to get the authentication status
import { useAuth } from '../../../Context/AuthContext';

const Profile = ({ currentAccount }) => {
  const { isAuthenticated, user, logout } = useAuth(); // Get authentication status

  const handleLogout = () => {
    // Trigger the logout function
    logout();
  };

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image
          src={images.user1}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />
        <div className={Style.profile_account_info}>
          <p>{user ? user.name : "Rohith"}</p>
          <small>{currentAccount ? `${currentAccount.slice(0, 18)}..` : "Not Connected"}</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href="/author">My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href="/author">My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href="/account">Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href="/contactus">Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href="/aboutus">About Us</Link>
            </p>
          </div>

          {/* Conditionally show Login or Logout */}
          {!isAuthenticated ? (
            <div className={Style.profile_menu_one_item}>
              <TbLogout />
              <p>
                <Link href="/login">Login</Link> {/* Show login when not authenticated */}
              </p>
            </div>
          ) : (
            <div className={Style.profile_menu_one_item}>
            <TbLogout />
            <button onClick={handleLogout} className={Style.logoutButton}>Logout</button> {/* Handle logout here */}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
