import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";

// SMART CONTRACT CONTEXT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  // USESTATE COMPONENTS
  const [activeMenu, setActiveMenu] = useState(null); // Track active menu
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();
  const { currentAccount, connectWallet, openError } = useContext(NFTMarketplaceContext);

  // Handle menu toggle
  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(`.${Style.navbar}`)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        {/* LEFT SIDE */}
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image src={images.logo} alt="logo" width={150} height={150} onClick={() => router.push("/")} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={Style.navbar_container_right}>
          {/* DISCOVER MENU */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={() => toggleMenu("discover")}>Discover</p>
            {activeMenu === "discover" && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={() => toggleMenu("help")}>Help Center</p>
            {activeMenu === "help" && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications className={Style.notify} onClick={() => toggleMenu("notification")} />
            {activeMenu === "notification" && <Notification />}
          </div>

          {/* CREATE BUTTON */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount ? (
              <Button btnName="Create" handleClick={() => router.push("/uploadNFT")} />
            ) : (
              <Button btnName="Connect" handleClick={connectWallet} />
            )}
          </div>

          {/* USER PROFILE */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => toggleMenu("profile")}
                className={Style.navbar_container_right_profile}
              />
              {activeMenu === "profile" && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          {/* MENU BUTTON */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight className={Style.menuIcon} onClick={() => setOpenSideMenu(!openSideMenu)} />
          </div>
        </div>
      </div>

      {/* SIDEBAR COMPONENT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setOpenSideMenu={setOpenSideMenu} currentAccount={currentAccount} connectWallet={connectWallet} />
        </div>
      )}

      {openError && <Error />}
    </div>
  );
};

export default NavBar;
