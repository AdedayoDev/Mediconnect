import React from "react";
import { motion } from "framer-motion";

/**
 * Input component with error state and animations
 */
export const Input = React.forwardRef(
  (
    { label, error, icon: Icon, type = "text", className = "", ...props },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='w-full'
      >
        {label && (
          <label className='block text-sm font-medium text-dark-200 mb-2'>
            {label}
          </label>
        )}
        <div className='relative'>
          {Icon && (
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400'>
              <Icon size={20} />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              w-full px-4 py-2.5 rounded-lg
              bg-dark-800 border-2 border-dark-700
              text-dark-50 placeholder-dark-500
              transition-all duration-300
              focus:outline-none
              ${Icon ? "pl-10" : ""}
              ${isFocused ? "border-primary-500 bg-dark-700" : ""}
              ${error ? "border-red-500 bg-red-500 bg-opacity-5" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-xs text-red-400 mt-1.5'
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  },
);

Input.displayName = "Input";
