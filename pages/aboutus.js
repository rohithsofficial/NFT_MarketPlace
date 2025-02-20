import React from "react";
import Image from "next/image";


//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";
import withAuthProtection from "../utils/withAuth";

const aboutus = () => {
  const founderArray = [
    {
      name: "Rohith",
      position: "Co-founder",
      images: images.founder1,
    },
    {
      name: "SAFAF",
      position: "Co-founder ",
      images: images.founder2,
    },
    {
      name: "VILAS",
      position: "Co-founder",
      images: images.founder3,
    },
    {
      name: "Amith",
      position: "Co-Founder",
      images: images.founder4,
    },
  ];

  const factsArray = [
    // {
    //   title: "10 million",
    //   info: "Articles have been public around the world (as of Sept. 30, 2024)",
    // },
    // {
    //   title: "100,000",
    //   info: "Registered users account (as of Sept. 30, 2024)",
    // },
    // {
    //   title: "220+",
    //   info: "Countries and regions have our presence (as of Sept. 30, 2024",
    // },
  ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1>👋 About Us.</h1>
            <p>
            We are a decentralized and innovative NFT marketplace committed to empowering creators and collectors worldwide. Our platform ensures transparency, security, and true digital ownership, enabling seamless transactions and an immersive experience in the world of blockchain-powered assets.
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <Image src={images.hero2} />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>⛱ Founder</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img}>
                <Image
                  src={el.images}
                  alt={el.name}
                  width={500}
                  height={500}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h3>{el.name}</h3>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className={Style.aboutus_box_title}>
          <h2>🚀 Fast Facts</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div> */}

        {/* <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div className={Style.aboutus_box_facts_box_info}>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <Brand />
    </div>
  );
};

export default withAuthProtection(aboutus);
