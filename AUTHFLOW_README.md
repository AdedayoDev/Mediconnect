# AuthFlow - Modern Authentication System

A production-quality web application demonstrating a complete authentication system with modern technologies, beautiful UI, and excellent UX. Perfect for a developer portfolio.

## 🎯 Features

- **Complete Authentication Flow**: Signup, signin, forgot password, OTP verification, and password reset
- **Modern UI/UX**: Beautiful dark theme with smooth animations and interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **State Management**: Global auth state with localStorage persistence using Zustand
- **Form Validation**: Real-time validation with Zod and React Hook Form
- **Protected Routes**: Secure dashboard only accessible to authenticated users
- **Mock API**: Simulated backend with realistic delays and responses
- **Animations**: Smooth page transitions and micro-interactions with Framer Motion
- **Professional Code**: Clean architecture, reusable components, well-documented code

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will open at `http://localhost:5173`

## 📊 Project Structure

```
src/
├── api/                      # Mock API service
│   └── mockAPI.js           # Simulated backend endpoints
├── animations/              # Animation utilities
│   └── variants.js          # Framer Motion animation variants
├── components/              # Reusable components
│   ├── auth/                # Auth-specific components
│   ├── common/              # Common UI components
│   │   ├── Button.jsx       # Button with loading states
│   │   ├── Input.jsx        # Input with error handling
│   │   ├── Toast.jsx        # Toast notifications
│   │   ├── OTPInput.jsx     # OTP input component
│   │   └── Layout.jsx       # Layout components
│   └── ProtectedRoute.jsx   # Route protection wrapper
├── context/                 # Context providers
│   └── ToastContext.jsx     # Toast notification context
├── hooks/                   # Custom hooks
│   └── useToast.js          # Toast notification hook
├── pages/                   # Page components
│   ├── Landing.jsx          # Landing page
│   ├── SignUp.jsx           # Signup page
│   ├── SignIn.jsx           # Login page
│   ├── ForgotPassword.jsx   # Forgot password page
│   ├── VerifyOTP.jsx        # OTP verification page
│   ├── ResetPassword.jsx    # Reset password page
│   └── Dashboard.jsx        # Protected dashboard
├── store/                   # Zustand store
│   └── authStore.js         # Global auth state
├── utils/                   # Utility functions
│   └── validators.js        # Validation utilities
├── App.jsx                  # Main app with routing
├── main.jsx                 # Entry point
├── index.css                # Global styles (Tailwind)
└── App.css                  # Component styles

```

## 🔐 Authentication Flow

### Sign Up

1. User enters name, email, password
2. Form validation with Zod
3. API creates user account
4. OTP is generated and sent (simulated)
5. Redirect to OTP verification

### OTP Verification

1. User enters 6-digit OTP
2. OTP is verified against the code
3. For signup: Account is activated
4. For forgot password: Redirect to password reset

### Sign In

1. User enters email and password
2. Credentials are validated
3. JWT-like token is generated
4. User is authenticated
5. Redirect to dashboard

### Forgot Password

1. User enters email
2. System validates email exists
3. OTP is generated
4. User verifies OTP
5. Sets new password
6. Can then sign in with new password

## 📝 Demo Credentials

Try the application with these demo accounts:

| Email            | Password | Name      |
| ---------------- | -------- | --------- |
| demo@example.com | Demo@123 | John Demo |
| jane@example.com | Test@123 | Jane Dev  |

Or create a new account and verify with any 6-digit OTP code.

## 🎨 Tech Stack

### Frontend

- **React** 19.2 - UI library
- **JavaScript** - Modern ES6+
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Router** - Client-side routing
- **Zustand** - State management
- **Lucide React** - Icon library

### Build & Development

- **Vite** - Lightning-fast build tool
- **ESLint** - Code quality
- **PostCSS + Autoprefixer** - CSS processing

## 🔄 API Endpoints

The mock API provides these endpoints:

```javascript
// Signup - Creates new user account
POST /api/signup
{
  name: string,
  email: string,
  password: string
}

// Login - Authenticates user
POST /api/login
{
  email: string,
  password: string
}

// Send OTP - Initiates forgot password
POST /api/send-otp
{
  email: string
}

// Verify OTP - Confirms OTP code
POST /api/verify-otp
{
  email: string,
  otp: string (6 digits)
}

// Reset Password - Sets new password
POST /api/reset-password
{
  email: string,
  newPassword: string
}

// Get User - Fetches current user
GET /api/user
Headers: { Authorization: 'Bearer {token}' }
```

## 🎭 Component API

### Button Component

```jsx
<Button
  variant='primary|secondary|outline|ghost'
  size='sm|md|lg'
  isLoading={false}
  disabled={false}
>
  Click me
</Button>
```

### Input Component

```jsx
<Input
  label='Label'
  type='text|email|password'
  placeholder='...'
  icon={IconComponent}
  error={errorMessage}
  {...register("fieldName")}
/>
```

### OTPInput Component

```jsx
<OTPInput value={otpValue} onChange={setOtp} error={errorMessage} />
```

### Toast Notification

```jsx
import { useToast } from "@/hooks/useToast";

const { addToast } = useToast();
addToast("Success message", "success|error|info");
```

## 🔒 Security Features

- Password validation (minimum 6 characters)
- Secure token storage in localStorage
- Protected routes that redirect to login
- OTP-based verification
- Mock JWT token with expiration
- CORS-ready API structure

**Note**: This is a demonstration project. In production:

- Hash passwords with bcrypt
- Use HTTPS only for token transmission
- Implement refresh token rotation
- Add rate limiting
- Use secure cookies (HttpOnly, Secure flags)

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components adapt automatically to screen size.

## ✨ Animation Features

- Page transitions with Framer Motion
- Smooth form appearance animations
- Button hover and tap effects
- Loading spinner animations
- Toast notification animations
- Staggered content animations
- Auto-focus on OTP inputs

## 🎯 State Management

Authentication state is managed globally using Zustand with persistence:

```javascript
import { useAuthStore } from "@/store/authStore";

// In components
const { user, isAuthenticated, login, logout } = useAuthStore();
```

State is persisted to localStorage and restored on app load.

## 🚀 Performance Optimizations

- Code splitting with React Router
- Lazy component loading
- Optimized re-renders with Zustand selectors
- TailwindCSS PurgeCSS for smaller bundle
- Framer Motion GPU-accelerated animations
- Debounced form input handlers

## 📦 Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### API calls not working

- Check browser console for errors
- Ensure mock API is initialized in App.jsx
- Verify fetch requests use correct endpoint paths

### Styling not applied

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Restart dev server
- Clear browser cache

### Protected routes not working

- Ensure ProtectedRoute wrapper is in place
- Check localStorage for auth_storage key
- Verify useAuthStore hydration is complete

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Zustand Documentation](https://zustand-demo.vercel.app/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev)

## 🤝 Contributing

This is a portfolio project. Feel free to:

- Extend with real backend integration
- Add more authentication methods (OAuth, etc.)
- Enhance with additional features
- Improve styling and animations
- Add unit and integration tests

## 📄 License

This project is open source and available for portfolio demonstration purposes.

## 🎓 Learning Outcomes

By studying this project, you'll learn:

- Modern React patterns and hooks
- State management with Zustand
- Form handling with React Hook Form
- CSS styling with TailwindCSS
- Animation techniques with Framer Motion
- API integration patterns
- Routing in single-page applications
- Authentication flow implementation
- Component composition and reusability
- Professional code organization

---

**Built with ❤️ for modern web development**
