import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Stethoscope,
  Users as PatientsIcon,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../hooks/useToast";
import { MediConnectLogo } from "../components/MediConnectLogo";

/**
 * Sign-up form validation schema
 */
const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    userType: z.enum(["patient", "doctor"], "Select account type"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/**
 * Sign Up page component - MediConnect
 */
export const SignUp = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { userType: "patient" },
  });

  const selectedType = watch("userType");

  const onSubmit = async (data) => {
    try {
      const result = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        userType: data.userType,
      });

      // Show OTP in alert if provided (development mode)
      if (result.otp) {
        alert(`🔐 Your OTP Code: ${result.otp}\n\nThis code expires in 10 minutes.`);
      }

      addToast("Sign up successful! OTP sent to your email.", "success");
      navigate("/verify-otp");
    } catch (error) {
      addToast(error.message, "error");
    }
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
            <span className='text-purple-400'>Join Healthcare</span>
          </h1>
          <p className='text-slate-300 text-lg mb-8'>
            Create your MediConnect account and connect with healthcare
            professionals or patients worldwide.
          </p>
          <div className='space-y-4'>
            {[
              "HIPAA-compliant security",
              "Verified professionals",
              "Secure video consultations",
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className='flex items-center gap-3'
              >
                <div className='w-2 h-2 bg-purple-500 rounded-full' />
                <span className='text-slate-200'>{item}</span>
              </motion.div>
            ))}
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
            <h2 className='text-2xl font-bold mb-2'>Create Account</h2>
            <p className='text-slate-400 mb-6'>
              Choose your role and get started
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              {/* User Type Selection */}
              <div className='grid grid-cols-2 gap-3 mb-6'>
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-all ${
                    selectedType === "patient"
                      ? "border-purple-500 bg-purple-500 bg-opacity-10"
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <input
                    type='radio'
                    value='patient'
                    {...register("userType")}
                    className='hidden'
                  />
                  <PatientsIcon className='w-6 h-6 mx-auto mb-2 text-purple-400' />
                  <div className='text-sm font-semibold'>Patient</div>
                </motion.label>

                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-all ${
                    selectedType === "doctor"
                      ? "border-purple-500 bg-purple-500 bg-opacity-10"
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <input
                    type='radio'
                    value='doctor'
                    {...register("userType")}
                    className='hidden'
                  />
                  <Stethoscope className='w-6 h-6 mx-auto mb-2 text-purple-400' />
                  <div className='text-sm font-semibold'>Doctor</div>
                </motion.label>
              </div>

              <Input
                label='Full Name'
                type='text'
                placeholder='John Doe'
                icon={User}
                error={errors.name?.message}
                {...register("name")}
              />

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

              <Input
                label='Confirm Password'
                type='password'
                placeholder='••••••••'
                icon={Lock}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              {errors.userType && (
                <p className='text-red-400 text-sm'>
                  {errors.userType.message}
                </p>
              )}

              <Button
                type='submit'
                isLoading={isLoading}
                className='w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
              >
                Create Account
              </Button>
            </form>

            <div className='mt-6 pt-6 border-t border-slate-700 text-center'>
              <p className='text-slate-400'>
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className='text-purple-400 hover:text-purple-300 transition-colors font-semibold'
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
