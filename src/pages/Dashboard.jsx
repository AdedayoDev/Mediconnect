import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, User, Mail, Stethoscope, Calendar, Heart } from "lucide-react";
import { Button } from "../components/common/Button";
import { Card, Container } from "../components/common/Layout";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../hooks/useToast";
import {
  MediConnectLogo,
  MediConnectLogoText,
} from "../components/MediConnectLogo";

/**
 * Dashboard page component - MediConnect - Protected route
 */
export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { addToast } = useToast();

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully!", "success");
    navigate("/");
  };

  const userTitle = user?.userType === "doctor" ? "Dr." : "";
  const userRole =
    user?.userType === "doctor" ? "Healthcare Provider" : "Patient";

  const stats = [
    {
      label: "Account Type",
      value: userRole,
      icon: userRole === "Healthcare Provider" ? Stethoscope : User,
    },
    {
      label: "Status",
      value: "Verified",
      icon: Heart,
    },
    {
      label: "Member Since",
      value: new Date().getFullYear().toString(),
      icon: Calendar,
    },
  ];

  const features = [
    {
      title: "Secure Consultations",
      description:
        user?.userType === "doctor"
          ? "Connect with patients securely for telehealth consultations."
          : "Book appointments with verified healthcare professionals.",
    },
    {
      title: "Medical Records",
      description:
        user?.userType === "doctor"
          ? "Manage patient records with HIPAA compliance."
          : "Store and access your medical history securely.",
    },
    {
      title: "Prescriptions",
      description:
        user?.userType === "doctor"
          ? "Issue and manage digital prescriptions."
          : "Receive and refill prescriptions online.",
    },
    {
      title: "Video Calls",
      description:
        user?.userType === "doctor"
          ? "Conduct secure video consultations with patients."
          : "Have face-to-face consultations from home.",
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      {/* Animated background */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 opacity-5 rounded-full blur-3xl' />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative z-10 border-b border-slate-700 backdrop-blur-md'
      >
        <Container>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center gap-2'>
              <MediConnectLogo size={32} />
              <MediConnectLogoText size='text-xl' />
            </div>
            <Button
              variant='ghost'
              onClick={handleLogout}
              className='flex items-center gap-2 text-slate-400 hover:text-slate-300'
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </Container>
      </motion.nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='relative z-10 py-12'
      >
        <Container>
          {/* Welcome Section */}
          <Card className='mb-8 bg-gradient-to-r from-purple-600 to-purple-700 border-0'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-3xl font-bold mb-2'>
                  Welcome, {userTitle} {user?.name}!
                </h2>
                <p className='text-purple-100'>
                  {user?.userType === "doctor"
                    ? "Ready to help your patients? Access all your resources below."
                    : "Welcome to your MediConnect dashboard. Find and book consultations with healthcare professionals."}
                </p>
              </div>
              <div className='hidden lg:block'>
                <div className='w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                  {user?.userType === "doctor" ? (
                    <Stethoscope className='w-12 h-12 text-white' />
                  ) : (
                    <User className='w-12 h-12 text-white' />
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* User Profile Section */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
            <Card className='lg:col-span-2'>
              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-4'>Account Information</h3>
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-3 p-4 bg-slate-700 rounded-lg'>
                  <User className='text-purple-400' />
                  <div className='flex-1'>
                    <p className='text-sm text-slate-400'>Full Name</p>
                    <p className='font-semibold'>{user?.name}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 p-4 bg-slate-700 rounded-lg'>
                  <Mail className='text-purple-400' />
                  <div className='flex-1'>
                    <p className='text-sm text-slate-400'>Email Address</p>
                    <p className='font-semibold'>{user?.email}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 p-4 bg-slate-700 rounded-lg'>
                  {user?.userType === "doctor" ? (
                    <Stethoscope className='text-purple-400' />
                  ) : (
                    <Heart className='text-purple-400' />
                  )}
                  <div className='flex-1'>
                    <p className='text-sm text-slate-400'>Account Type</p>
                    <p className='font-semibold'>{userRole}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className='text-xl font-bold mb-6'>Account Summary</h3>
              <div className='space-y-4'>
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className='p-3 bg-slate-700 rounded-lg'
                  >
                    <p className='text-xs text-slate-400 mb-1'>{stat.label}</p>
                    <p className='font-semibold text-purple-400'>
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Features Section */}
          <Card>
            <h3 className='text-xl font-bold mb-6'>
              {user?.userType === "doctor"
                ? "Provider Features"
                : "Available Services"}
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className='p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors'
                >
                  <h4 className='font-semibold text-purple-400 mb-1'>
                    {feature.title}
                  </h4>
                  <p className='text-sm text-slate-400'>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='mt-8 flex gap-4'
          >
            <Button
              onClick={() => navigate("/")}
              className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
            >
              Back to Home
            </Button>
            <Button variant='outline' onClick={handleLogout}>
              Logout
            </Button>
          </motion.div>
        </Container>
      </motion.main>
    </div>
  );
};
