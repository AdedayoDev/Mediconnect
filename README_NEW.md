# 🔐 AuthFlow - Production-Ready Authentication System

A complete, modern authentication system built with React, TypeScript alternatives, TailwindCSS, and Framer Motion. Perfect for adding to your developer portfolio.

## ✨ What's Included

- ✅ Complete authentication flows (signup, login, password recovery, OTP verification)
- ✅ Beautiful, responsive UI with dark theme
- ✅ Smooth animations and micro-interactions
- ✅ Global state management with Zustand
- ✅ Real-time form validation (Zod + React Hook Form)
- ✅ Protected routes and dashboard
- ✅ Mock API with realistic delays
- ✅ localStorage persistence
- ✅ Production-ready code structure
- ✅ Comprehensive documentation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, start the backend
cd backend && npm run dev
```

Then visit: `http://localhost:5173`

### 🔑 Development Mode Notes

- **OTP Codes**: During development, OTP verification codes are logged to the **backend terminal/console** AND displayed in a **browser alert popup** after signup/forgot password.
- **Email Sending**: Real emails are attempted but may fail in development. The system gracefully falls back to console logging and UI alerts.
- **Data Persistence**: User data is saved to `backend/db.json` and persists across restarts.

**Demo/Test Credentials:**
- Any email/password combination works for testing
- OTP codes appear in browser alerts and backend console

## 📚 Documentation

Read the complete documentation to get started:

| Document                                       | Purpose                            |
| ---------------------------------------------- | ---------------------------------- |
| [**QUICK_START.md**](./QUICK_START.md)         | 5-minute setup guide (start here!) |
| [**AUTHFLOW_README.md**](./AUTHFLOW_README.md) | Complete feature overview          |
| [**SETUP_GUIDE.md**](./SETUP_GUIDE.md)         | Customization & deployment guide   |
| [**API_REFERENCE.md**](./API_REFERENCE.md)     | Complete API documentation         |

## 🎯 Features

### Authentication Flows

- **Sign Up**: Name, email, password with OTP verification
- **Sign In**: Email & password with session management
- **Forgot Password**: Email verification + OTP + password reset
- **OTP Verification**: 6-digit code input with auto-focus

### UI/UX

- Dark modern theme with accent colors
- Fully responsive (mobile, tablet, desktop)
- Smooth page transitions
- Loading states with spinners
- Toast notifications (success, error, info)
- Form validation with real-time feedback
- Auto-focus on OTP inputs
- Beautiful animations on all interactions

### Technical

- Protected routes with automatic redirects
- Global auth state with localStorage persistence
- Mock API with realistic simulated delays
- Real-time form validation
- Error handling and user feedback
- Clean, well-organized code structure
- Professional component library

## 🏗️ Architecture

```
Frontend (React + React Router)
    ↓
State Management (Zustand)
    ↓
API Layer (Mock endpoints)
    ↓
localStorage (Persistence)
```

### Key Files

| File                     | Purpose                     |
| ------------------------ | --------------------------- |
| `src/store/authStore.js` | Global auth state & actions |
| `src/api/mockAPI.js`     | Simulated backend endpoints |
| `src/App.jsx`            | Routing configuration       |
| `src/pages/`             | Page components             |
| `src/components/`        | Reusable UI components      |

## 📂 Project Structure

```
authentication/
├── src/
│   ├── api/               # API layer (mock)
│   ├── animations/        # Animation variants
│   ├── components/        # React components
│   │   ├── common/       # Reusable UI components
│   │   └── auth/         # Auth-specific
│   ├── context/          # Context providers (Toast)
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page components
│   ├── store/            # Zustand state store
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── QUICK_START.md        # Quick setup guide
├── AUTHFLOW_README.md    # Complete docs
├── SETUP_GUIDE.md        # Deployment guide
├── API_REFERENCE.md      # API documentation
├── package.json          # Dependencies
├── vite.config.js        # Vite config
├── tailwind.config.js    # Tailwind config
└── postcss.config.js     # PostCSS config
```

## 🛠️ Tech Stack

### Core

- **React 19.2** - UI framework
- **React Router 6** - Client-side routing
- **Vite** - Build tool (lightning fast!)

### Styling & Animation

- **TailwindCSS 3** - Utility-first CSS
- **Framer Motion 10** - Smooth animations
- **Lucide Icons** - Beautiful icons

### State & Forms

- **Zustand 4** - State management
- **React Hook Form 7** - Form handling
- **Zod 3** - Schema validation

### TypeScript-Ready

While using JavaScript for simplicity, the codebase is fully typed and ready for TypeScript migration.

## 🎨 Demo Accounts

Try these pre-configured accounts:

```
Account 1:
- Email: demo@example.com
- Password: Demo@123
- Name: John Demo

Account 2:
- Email: jane@example.com
- Password: Test@123
- Name: Jane Dev
```

Or create a new account! Any 6-digit code works for OTP verification.

## 🔐 Security Features

- ✅ Password validation (min 6 characters)
- ✅ Secure token storage
- ✅ Protected routes
- ✅ OTP verification
- ✅ Simulated JWT tokens
- ✅ Session management

**Production Considerations:**

- Use HTTPS only
- Hash passwords with bcrypt
- Implement refresh token rotation
- Add rate limiting
- Use secure HTTP headers
- Add CSRF protection

## 📱 Responsive Design

Works perfectly on:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## ✨ Components

### Pre-built UI Components

- `<Button>` - Multiple variants and sizes
- `<Input>` - With icon support and error states
- `<OTPInput>` - 6-digit OTP code input
- `<Card>` - Flexible card layout
- `<Container>` - Max-width wrapper
- `<Toast>` - Notification system

### Custom Hooks

- `useToast()` - Show notifications
- `useAuthStore()` - Access auth state

### Page Components

- Landing page
- Sign up page
- Sign in page
- Forgot password page
- OTP verification page
- Password reset page
- Protected dashboard

## 🚀 Performance

- Bundle size optimized with TailwindCSS PurgeCSS
- Code splitting with React Router
- Lazy loading ready
- GPU-accelerated animations
- Fast refresh with Vite HMR

## 📊 Animations

- Smooth page transitions
- Form field animations
- Button hover effects
- Loading spinners
- Toast slide-in animations
- Staggered content reveals

## 🧪 Testing

Manual testing checklist included. Extend with:

- Unit tests (Vitest)
- Component tests (React Testing Library)
- E2E tests (Cypress/Playwright)

## 🐛 Troubleshooting

**API not working?**

- Check browser console for errors
- Verify setupMockAPI() is called in App.jsx
- Clear localStorage and refresh

**Styles not showing?**

- Reinstall dependencies: `rm -rf node_modules && npm install`
- Restart dev server
- Clear browser cache

**Protected routes redirecting?**

- Ensure ProtectedRoute wrapper is in place
- Check auth_storage in localStorage
- Verify user is logged in

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more troubleshooting.

## 🔄 Integrate with Real Backend

Replace mock API with a real backend:

1. Update `src/store/authStore.js` with your API endpoints
2. Remove `setupMockAPI()` from `src/App.jsx`
3. Add environment variables
4. Implement error handling
5. Add token refresh logic

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.

## 📈 Next Steps

1. **Learn the Code** - Study the project structure
2. **Customize** - Adjust colors, add features
3. **Extend** - Add OAuth, 2FA, etc.
4. **Deploy** - Ship to production
5. **Integrate** - Connect to real backend

## 📚 Resources

- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Zustand Docs](https://zustand.surge.sh)
- [React Router Docs](https://reactrouter.com)

## 🎓 Learning Value

This project teaches:

- Modern React patterns
- State management
- Form handling & validation
- CSS with TailwindCSS
- Animations with Framer Motion
- Authentication flows
- API integration
- Routing
- Component composition
- Code organization

Perfect for:

- Portfolio projects
- Interview preparation
- Learning React best practices
- Understanding auth flows
- Production-ready code examples

## 💡 Pro Tips

1. **Use Browser DevTools**
   - React DevTools browser extension
   - Check Network tab for API calls
   - Application tab for localStorage

2. **Customize Easily**
   - Colors in `tailwind.config.js`
   - Branding in `src/pages/Landing.jsx`
   - API endpoints in `src/api/mockAPI.js`

3. **Hot Reload**
   - Vite reloads instantly on save
   - Edit and watch changes live

## 🤝 Contributing

Feel free to:

- Fork and extend
- Add new features
- Improve documentation
- Share on GitHub
- Mention in interviews

## 📄 License

Open source for portfolio and educational use.

## 🎉 Ready to Start?

```bash
npm install && npm run dev
```

Visit `http://localhost:5173` and start exploring!

---

**Questions?** Check [QUICK_START.md](./QUICK_START.md) first!

**Built for modern developers. Ready for production. Perfect for portfolios.**
