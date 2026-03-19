import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Clock } from "lucide-react";
import { Button } from "../components/common/Button";
import { Container } from "../components/common/Layout";
import {
  MediConnectLogo,
  MediConnectLogoText,
} from "../components/MediConnectLogo";

/**
 * Landing page component - MediConnect Healthcare Platform
 */
export const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description:
        "Connect with qualified healthcare professionals for virtual consultations anytime.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Access medical expertise whenever you need it. No waiting rooms, just care.",
    },
    {
      icon: Users,
      title: "Expert Network",
      description:
        "Verified doctors and specialists ready to help with your health concerns.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden'>
      {/* Animated background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 opacity-5 rounded-full blur-3xl' />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='relative z-10 border-b border-slate-700 backdrop-blur-md'
      >
        <Container>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center gap-2'>
              <MediConnectLogo size={32} />
              <MediConnectLogoText size='text-xl' />
            </div>
            <div className='flex gap-4'>
              <Button variant='ghost' onClick={() => navigate("/signin")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/signup")}>Join Now</Button>
            </div>
          </div>
        </Container>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial='hidden'
        animate='visible'
        variants={containerVariants}
        className='relative z-10 py-20 md:py-32'
      >
        <Container>
          <div className='text-center max-w-3xl mx-auto'>
            <motion.h2
              variants={itemVariants}
              className='text-5xl md:text-6xl lg:text-7xl font-bold mb-6'
            >
              Healthcare Redefined
              <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600'>
                At Your Fingertips
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='text-xl text-slate-300 mb-12'
            >
              MediConnect connects patients with verified healthcare
              professionals for virtual consultations, medical advice, and
              comprehensive health support - secure, instant, and always
              available.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className='flex gap-4 justify-center flex-col sm:flex-row'
            >
              <Button
                size='lg'
                onClick={() => navigate("/signup")}
                className='flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
              >
                Get Started <ArrowRight size={20} />
              </Button>
              <Button
                variant='outline'
                size='lg'
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial='hidden'
        whileInView='visible'
        variants={containerVariants}
        viewport={{ once: true, margin: "-100px" }}
        className='relative z-10 py-20'
      >
        <Container>
          <motion.div variants={itemVariants} className='text-center mb-16'>
            <h3 className='text-3xl md:text-4xl font-bold mb-4'>
              Why Choose MediConnect?
            </h3>
            <p className='text-slate-300 text-lg'>
              Professional healthcare at your convenience.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className='grid grid-cols-1 md:grid-cols-3 gap-8'
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className='bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-purple-500 transition-colors'
              >
                <feature.icon className='w-12 h-12 text-purple-400 mb-4' />
                <h4 className='text-xl font-bold mb-3'>{feature.title}</h4>
                <p className='text-slate-400'>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial='hidden'
        whileInView='visible'
        variants={containerVariants}
        viewport={{ once: true, margin: "-100px" }}
        className='relative z-10 py-20'
      >
        <Container>
          <motion.div
            variants={itemVariants}
            className='bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-12 text-center'
          >
            <h3 className='text-3xl font-bold mb-4'>
              Your Health, Our Priority
            </h3>
            <p className='text-purple-100 mb-8 text-lg'>
              Join thousands of patients and healthcare professionals on
              MediConnect today.
            </p>
            <Button
              variant='secondary'
              size='lg'
              onClick={() => navigate("/signup")}
              className='bg-white text-purple-700 hover:bg-slate-100'
            >
              Join MediConnect
            </Button>
          </motion.div>
        </Container>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='relative z-10 border-t border-slate-700 mt-20 py-10'
      >
        <Container>
          <div className='text-center text-slate-400'>
            <p>
              &copy; 2026 MediConnect. Secure, Professional Healthcare Platform.
            </p>
          </div>
        </Container>
      </motion.footer>
    </div>
  );
};
