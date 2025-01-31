import "../styles/globals.css";
import { useRouter } from "next/router";
import { AuthProvider } from "../Context/AuthContext"; // Import AuthProvider
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <NFTMarketplaceProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </NFTMarketplaceProvider>
    </AuthProvider>
  );
};

export default MyApp;
