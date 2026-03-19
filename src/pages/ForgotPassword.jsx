import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../hooks/useToast";
import { MediConnectLogo } from "../components/MediConnectLogo";

/**
 * Forgot password form validation schema
 */
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/**
 * Forgot Password page component - MediConnect
 */
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const sendOTP = useAuthStore((state) => state.sendOTP);
  const isLoading = useAuthStore((state) => state.isLoading);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await sendOTP(data.email);

      // Show OTP in alert if provided (development mode)
      if (result.otp) {
        alert(`🔐 Your Password Reset OTP: ${result.otp}\n\nThis code expires in 15 minutes.`);
      }

      addToast(
        "OTP sent to your email. Check inbox and spam folder.",
        "success",
      );
      setTimeout(() => navigate("/verify-otp"), 500);
    } catch (error) {
      addToast(error.message, "error");
    }
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
            <div className='w-16 h-16 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <MediConnectLogo size={32} />
            </div>
            <h2 className='text-2xl font-bold mb-2'>Forgot Your Password?</h2>
            <p className='text-slate-400'>
              Enter your email and we'll send you an OTP to reset your password.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <Input
              label='Email Address'
              type='email'
              placeholder='your@email.com'
              icon={Mail}
              error={errors.email?.message}
              {...register("email")}
            />

            <Button
              type='submit'
              isLoading={isLoading}
              className='w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
            >
              Send OTP
            </Button>
          </form>

          <div className='mt-6 pt-6 border-t border-slate-700 text-center'>
            <button
              onClick={() => navigate("/signin")}
              className='text-purple-400 hover:text-purple-300 transition-colors font-semibold'
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
