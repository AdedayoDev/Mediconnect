import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../hooks/useToast";
import { MediConnectLogo } from "../components/MediConnectLogo";

/**
 * Sign-in form validation schema
 */
const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * Sign In page component - MediConnect
 */
export const SignIn = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      addToast("Welcome back! Signing you in...", "success");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  // Sign in to existing account
  const handleSignIn = () => {
    // This is just a placeholder - actual signing happens in onSubmit
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl'>
        {/* Left side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='hidden lg:flex flex-col justify-center'
        >
          <div className='flex items-center gap-3 mb-6'>
            <MediConnectLogo size={40} />
            <h1 className='text-4xl font-bold'>
              <span className='bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent'>
                Medi
              </span>
              <span className='text-white'>Connect</span>
            </h1>
          </div>
          <h1 className='text-5xl font-bold mb-4'>
            <span className='text-purple-400'>Welcome Back</span>
          </h1>
          <p className='text-slate-300 text-lg mb-8'>
            Sign in to access your MediConnect account and manage your health or
            practice.
          </p>
          <div className='space-y-4'>
            <p className='text-slate-300 text-lg'>
              Sign in with your registered email and password to access your
              account.
            </p>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='flex items-center justify-center'
        >
          <div className='w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl p-8'>
            <h2 className='text-2xl font-bold mb-2'>Sign In</h2>
            <p className='text-slate-400 mb-8'>
              Access your MediConnect account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <Input
                label='Email Address'
                type='email'
                placeholder='your@email.com'
                icon={Mail}
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label='Password'
                type='password'
                placeholder='••••••••'
                icon={Lock}
                error={errors.password?.message}
                {...register("password")}
              />

              <div className='flex justify-between items-center'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 rounded bg-slate-700 border-slate-600 accent-purple-500'
                  />
                  <span className='text-sm text-slate-400'>Remember me</span>
                </label>
                <button
                  onClick={() => navigate("/forgot-password")}
                  className='text-sm text-purple-400 hover:text-purple-300 transition-colors'
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type='submit'
                isLoading={isLoading}
                className='w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
              >
                Sign In
              </Button>
            </form>

            <div className='mt-6 pt-6 border-t border-slate-700 text-center'>
              <p className='text-slate-400'>
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className='text-purple-400 hover:text-purple-300 transition-colors font-semibold'
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
