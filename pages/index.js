import React, { useState, useEffect, useContext } from "react";
// INTERNAL IMPORT
import withAuthProtection from "../utils/withAuth";
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";

// IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount, fetchNFTs } = useContext(
    NFTMarketplaceContext
  );

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    if (currentAccount) {
      fetchNFTs()
        .then((items) => {
          console.log("Fetched NFTs:", items); // Debugging log
          if (Array.isArray(items)) {
            setNfts(items.reverse());
            setNftsCopy(items);
          } else {
            setNfts([]); // Prevents undefined state
          }
        })
        .catch((error) => {
          console.error("Error fetching NFTs:", error);
          setNfts([]); // Ensures fallback state
        });
    }
  }, [currentAccount]);

  // CREATOR LIST
  const creators = getTopCreators(nfts || []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <br></br>
      {/* <Filter /> */}
      {Array.isArray(nfts) && nfts.length === 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      <BigNFTSilder />
      {/* <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive /> */}
      {Array.isArray(creators) && creators.length === 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}
      {/* <Slider /> */}
      {/* <Collection /> */}
      {/* <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category /> */}
      <Subscribe />
      {/* <Brand /> */}
      {/* <Video /> */}
    </div>
  );
};

export default withAuthProtection(Home);
