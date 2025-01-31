import { useRouter } from "next/router";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";

const withAuthProtection = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return <div>Loading...</div>; // Optional: Add a spinner or loader
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return ProtectedComponent;
};

export default withAuthProtection;
