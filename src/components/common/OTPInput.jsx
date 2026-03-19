import React from "react";
import { motion } from "framer-motion";

/**
 * OTP input component with animation
 */
export const OTPInput = React.forwardRef(
  ({ value = "", onChange, error }, ref) => {
    const handleChange = (e, index) => {
      const val = e.target.value;
      if (!/^\d*$/.test(val)) return;

      const newValue = value.split("");
      newValue[index] = val;
      onChange(newValue.join(""));

      // Auto-focus next input
      if (val && index < 5) {
        const nextInput = document.querySelector(
          `input[data-otp-index="${index + 1}"]`,
        );
        nextInput?.focus();
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        const prevInput = document.querySelector(
          `input[data-otp-index="${index - 1}"]`,
        );
        prevInput?.focus();
      }
    };

    const handlePaste = (e) => {
      const paste = e.clipboardData.getData("text");
      if (/^\d{6}$/.test(paste)) {
        onChange(paste);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full'
      >
        <label className='block text-sm font-medium text-dark-200 mb-3'>
          Enter OTP Code
        </label>
        <div className='flex gap-3 justify-center mb-3' onPaste={handlePaste}>
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              ref={i === 0 ? ref : null}
              type='text'
              inputMode='numeric'
              maxLength='1'
              value={value[i] || ""}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              data-otp-index={i}
              className={`
                w-12 h-12 text-2xl text-center font-bold
                bg-dark-800 border-2 rounded-lg
                transition-all duration-300
                focus:outline-none
                ${
                  error
                    ? "border-red-500 bg-red-500 bg-opacity-5"
                    : "border-dark-700 focus:border-primary-500"
                }
              `}
            />
          ))}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-xs text-red-400 text-center'
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  },
);

OTPInput.displayName = "OTPInput";
