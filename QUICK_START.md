# AuthFlow - Developer Quick Start

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

### 3. Open Browser

Visit: `http://localhost:5173`

### 4. Test Authentication

- Click "Sign In" → Use `demo@example.com` / `Demo@123`
- Click "Sign Up" → Create new account with any 6-digit OTP
- Click "Forgot Password" → Reset password flow

## 📂 File Structure Guide

Where to find what:

| What                       | Where                     |
| -------------------------- | ------------------------- |
| Authentication logic       | `src/store/authStore.js`  |
| API endpoints              | `src/api/mockAPI.js`      |
| Pages (signup, login, etc) | `src/pages/`              |
| Reusable UI components     | `src/components/common/`  |
| Form validation            | `src/utils/validators.js` |
| Global styles              | `src/index.css`           |
| Routing                    | `src/App.jsx`             |

## 🔐 Key Components

### useAuthStore

Global state for authentication:

```jsx
import { useAuthStore } from "@/store/authStore";

const { user, isAuthenticated, login, logout } = useAuthStore();
```

### useToast

Show notifications:

```jsx
import { useToast } from "@/hooks/useToast";

const { addToast } = useToast();
addToast("Success!", "success");
addToast("Error occurred", "error");
```

### ProtectedRoute

Wrap components that need authentication:

```jsx
<Route
  path='/dashboard'
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 🎨 Making Changes

### Add New Authentication Step

1. Create new page in `src/pages/NewStep.jsx`
2. Add route in `src/App.jsx`
3. Add method in `src/store/authStore.js`
4. Add API handler in `src/api/mockAPI.js`

### Modify Form Fields

Edit validation schema in page file:

```jsx
const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  // Add new field:
  phone: z.string().regex(/^\d{10}$/),
});
```

### Change Styling

1. Update Tailwind classes in JSX files
2. Or modify `tailwind.config.js` for global changes
3. Edit `src/index.css` for global styles

### Add Animation

Use Framer Motion in components:

```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>;
```

## 🧪 Testing Changes Locally

### Test Signup

```
1. Go to /signup
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123
3. Enter OTP: any 6 digits
4. Should redirect to dashboard
```

### Test Login

```
1. Go to /signin
2. Email: demo@example.com
3. Password: Demo@123
4. Should see dashboard
```

### Test Protected Routes

```
1. Logout from dashboard
2. Try accessing /dashboard directly
3. Should redirect to /signin
```

### Test Form Validation

```
1. Try invalid email: "invalid"
2. Try password < 6 chars: "abc"
3. Try mismatched passwords
4. Each should show error messages
```

## 🐛 Common Issues & Fixes

| Problem                | Solution                                              |
| ---------------------- | ----------------------------------------------------- |
| API calls fail         | Check console → Ensure setupMockAPI() runs in App.jsx |
| Styling broken         | Clear cache → `rm -rf node_modules && npm install`    |
| Can't access dashboard | Verify localStorage has auth_storage                  |
| Animations lag         | Check Framer Motion version in package.json           |

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔗 Project Links

- **Main Docs**: [AUTHFLOW_README.md](./AUTHFLOW_README.md)
- **Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **API Reference**: [API_REFERENCE.md](./API_REFERENCE.md)

## 💡 Pro Tips

1. **Use Browser DevTools**
   - React DevTools for component inspection
   - Network tab to monitor API calls
   - Application tab to check localStorage

2. **Debug State**
   - Access store: `window.__ZUSTAND_STORE__` (if configured)
   - Check localStorage: `localStorage.getItem('auth-storage')`

3. **Hot Reload**
   - Edit files and save = instant reload
   - Vite is very fast!

4. **Component Reusability**
   - Button, Input, Card, etc. are reusable
   - Check `src/components/common/` for available components

## 🎓 What You'll Learn

- React hooks (useState, useEffect, useContext, etc.)
- Zustand state management
- React Hook Form + Zod validation
- Framer Motion animations
- TailwindCSS styling
- React Router navigation
- Authentication patterns
- Mock API implementation

## 🤝 Next Steps

After understanding the project:

1. **Extend Features**
   - Add 2FA
   - Add social login
   - Add user profile editing

2. **Integrate Backend**
   - Connect to real API
   - Add database
   - Implement JWT refresh

3. **Improve Security**
   - Add rate limiting
   - Implement CSRF protection
   - Add input sanitization

4. **Add Testing**
   - Unit tests with Vitest
   - E2E tests with Cypress
   - Component tests with React Testing Library

## 📞 Need Help?

Check the documentation files:

- `AUTHFLOW_README.md` - Complete feature overview
- `SETUP_GUIDE.md` - Customization & deployment
- `API_REFERENCE.md` - Complete API documentation

---

**Ready to code? Start with `npm run dev`! 🎉**
