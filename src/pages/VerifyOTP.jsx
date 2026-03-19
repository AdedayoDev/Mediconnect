import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/common/Button";
import { OTPInput } from "../components/common/OTPInput";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../hooks/useToast";
import { MediConnectLogo } from "../components/MediConnectLogo";

/**
 * OTP Verification page component - MediConnect
 */
export const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");
  const otpInputRef = useRef(null);

  const verifyOTP = useAuthStore((state) => state.verifyOTP);
  const setOTPCode = useAuthStore((state) => state.setOTPCode);
  const isLoading = useAuthStore((state) => state.isLoading);
  const resetPasswordEmail = useAuthStore((state) => state.resetPasswordEmail);
  const { addToast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    try {
      setError("");
      setOTPCode(otp); // Store OTP for reset flow
      await verifyOTP(otp);
      addToast("Email verified successfully!", "success");

      if (resetPasswordEmail) {
        setTimeout(() => navigate("/reset-password"), 500);
      } else {
        setTimeout(() => navigate("/dashboard"), 500);
      }
    } catch (error) {
      setError(error.message);
      addToast(error.message, "error");
    }
  };

  const handleResendOTP = () => {
    setOtp("");
    addToast("OTP resent to your email", "info");
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <div className='bg-slate-800 border border-slate-700 rounded-2xl p-8'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center mb-8'
          >
            <div className='flex justify-center mb-4'>
              <MediConnectLogo size={44} />
            </div>
            <h2 className='text-2xl font-bold mb-2'>Verify Your Email</h2>
            <p className='text-slate-400'>
              Enter the 6-digit OTP we sent to your email
            </p>
          </motion.div>

          <div className='space-y-6'>
            <OTPInput
              ref={otpInputRef}
              value={otp}
              onChange={setOtp}
              error={error}
            />

            <Button
              onClick={handleVerify}
              isLoading={isLoading}
              className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
            >
              Verify OTP
            </Button>

            <div className='text-center'>
              <p className='text-sm text-slate-400 mb-3'>
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOTP}
                className='text-purple-400 hover:text-purple-300 transition-colors font-semibold text-sm'
              >
                Resend OTP
              </button>
            </div>
          </div>

          <div className='mt-6 pt-6 border-t border-slate-700 text-center'>
            <button
              onClick={() =>
                navigate(resetPasswordEmail ? "/forgot-password" : "/signin")
              }
              className='text-slate-400 hover:text-slate-300 transition-colors text-sm'
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Demo info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='mt-6 bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4 text-center text-sm text-purple-300'
        >
          <p className='font-semibold mb-2'>📧 Email-Based Verification</p>
          <p>
            An OTP has been sent to your registered email address. Check your
            inbox and spam folder.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
