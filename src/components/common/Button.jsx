import React from "react";
import { motion } from "framer-motion";

/**
 * Button component with loading state and animations
 */
export const Button = React.forwardRef(
  (
    {
      children,
      isLoading = false,
      disabled = false,
      variant = "primary",
      size = "md",
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";

    const variantClasses = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-400",
      secondary:
        "bg-dark-700 text-white hover:bg-dark-600 border border-dark-600",
      outline:
        "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:bg-opacity-10",
      ghost: "text-primary-600 hover:bg-primary-600 hover:bg-opacity-10",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
          ${disabled || isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        `}
        {...props}
      >
        {isLoading ? (
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
            {children}
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
