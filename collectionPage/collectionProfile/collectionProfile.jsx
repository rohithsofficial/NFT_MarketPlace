import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./collectionProfile.module.css";
import images from "../../img";

const collectionProfile = () => {
  const cardArray = [1, 2, 3, 4];
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={images.nft_image_1}  // Ensure the correct image path here
            alt="nft image"
            width={800}
            height={800}
            className={Style.collectionProfile_box_left_img}
          />

          <div className={Style.collectionProfile_box_left_social}>
            <a href="https://www.facebook.com/rohithoffical" target="_blank" rel="noopener noreferrer">
              <TiSocialFacebook />
            </a>
            <a href="https://www.instagram.com/rohith_official/" target="_blank" rel="noopener noreferrer">
              <TiSocialInstagram />
            </a>
            <a href="https://www.linkedin.com/in/rohithoffical" target="_blank" rel="noopener noreferrer">
              <TiSocialLinkedin />
            </a>
            <a href="https://x.com/rohithsoffical" target="_blank" rel="noopener noreferrer">
              <TiSocialTwitter />
            </a>
          </div>
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>Awesome NFTs Collection</h1>
          <p>
          NFTVerse is a collection of 5,555 unique artworks where colors come to life. 
          Step into the world of NFTVerse by Museum of Toys and experience something extraordinary.
          </p>

          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div
                className={Style.collectionProfile_box_middle_box_item}
                key={i + 1}
              >
                <small>Floor price</small>
                <p>${i + 1}95,4683</p>
                <span>+ {i + 2}.11%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default collectionProfile;
