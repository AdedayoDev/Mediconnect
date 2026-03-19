import React from "react";
import { motion } from "framer-motion";

/**
 * Loading skeleton component for animations
 */
export const Skeleton = ({ className = "" }) => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`bg-dark-700 rounded ${className}`}
    />
  );
};

/**
 * Card component for layout
 */
export const Card = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-dark-800 border border-dark-700 rounded-xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * Container component for consistent spacing
 */
export const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Divider component
 */
export const Divider = ({ className = "" }) => {
  return <div className={`h-px bg-dark-700 ${className}`} />;
};
