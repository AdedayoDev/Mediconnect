import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Skeleton, Container } from "../components/common/Layout";
import { motion } from "framer-motion";

/**
 * Protected Route wrapper - Redirects to login if not authenticated
 */
export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isHydrating, setIsHydrating] = React.useState(true);
  const location = useLocation();

  // Hydrate auth state on mount
  useEffect(() => {
    const hydrate = async () => {
      const hydrate = useAuthStore.getState().hydrate;
      await hydrate();
      setIsHydrating(false);
    };
    hydrate();
  }, []);

  if (isHydrating) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center'>
        <Container>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Skeleton className='w-full h-64 rounded-xl' />
          </motion.div>
        </Container>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
};
