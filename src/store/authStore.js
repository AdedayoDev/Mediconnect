import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  apiSignup,
  apiVerifyOTP,
  apiLogin,
  apiForgotPassword,
  apiResetPassword,
} from "../api/realAPI";

/**
 * Auth store using Zustand for global state management
 * NOW USES REAL BACKEND API
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      token: null,
      isLoading: false,
      error: null,
      otpStep: null, // null, 'pending', 'verified'
      resetPasswordEmail: null,
      isResetPassword: false,
      otpCode: null,

      // Actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      /**
       * Signup action - creates new user account with real backend
       */
      signup: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const data = await apiSignup(credentials);
          set({
            user: data.user,
            resetPasswordEmail: null,
            isResetPassword: false,
            otpStep: "pending",
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      /**
       * Login action - authenticates with real backend
       */
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const data = await apiLogin(credentials);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      /**
       * Verify OTP with real backend
       */
      verifyOTP: async (otp) => {
        set({ isLoading: true, error: null });
        try {
          const state = get();
          const email = state.resetPasswordEmail || state.user?.email;

          if (!email) {
            throw new Error("Missing email for OTP verification");
          }

          const data = await apiVerifyOTP(email, otp);

          const isPasswordReset = state.isResetPassword;

          set({
            otpStep: "verified",
            token: isPasswordReset ? null : data.token,
            user: data.user,
            isAuthenticated: isPasswordReset ? false : true,
            isLoading: false,
            resetPasswordEmail: isPasswordReset ? state.resetPasswordEmail : null,
            isResetPassword: false,
            otpCode: otp,
          });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      /**
       * Forgot Password - request OTP with real backend
       */
      sendOTP: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const data = await apiForgotPassword(email);
          set({
            resetPasswordEmail: email,
            isResetPassword: true,
            otpStep: "pending",
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      /**
       * Reset password with real backend
       */
      resetPassword: async (newPassword) => {
        set({ isLoading: true, error: null });
        try {
          const state = get();

          // Note: We need the OTP for reset - update this to pass OTP separately
          // For now, we'll store the OTP in state during verification
          await apiResetPassword(
            state.resetPasswordEmail,
            state.otpCode,
            newPassword,
          );

          set({
            resetPasswordEmail: null,
            otpStep: null,
            otpCode: null,
            isResetPassword: false,
            isLoading: false,
          });
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      /**
       * Store OTP temporarily for reset flow
       */
      setOTPCode: (code) => set({ otpCode: code }),

      /**
       * Logout
       */
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          otpStep: null,
          resetPasswordEmail: null,
          isResetPassword: false,
          otpCode: null,
          error: null,
        });
      },

      /**
       * Hydrate from storage
       */
      hydrate: async () => {
        const token = localStorage.getItem("auth_token");
        if (token) {
          try {
            const userStr = localStorage.getItem("auth_user");
            if (userStr) {
              const user = JSON.parse(userStr);
              set({
                user,
                token,
                isAuthenticated: true,
              });
            }
          } catch {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    },
  ),
);
