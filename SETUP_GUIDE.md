# AuthFlow - Setup & Deployment Guide

## 🔧 Initial Setup

### Step 1: Clone and Install

```bash
cd authentication
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

### Step 3: Verify Installation

1. Open browser to http://localhost:5173
2. You should see the AuthFlow landing page
3. Try signing in with demo credentials:
   - Email: `demo@example.com`
   - Password: `Demo@123`

## 🎨 Customization Guide

### Change Primary Color

Edit [tailwind.config.js](./tailwind.config.js):

```javascript
colors: {
  primary: {
    // Change these values
    500: '#0ea5e9', // Sky blue - change to any color
    600: '#0284c7',
    ...
  }
}
```

### Update Branding

Edit [src/pages/Landing.jsx](./src/pages/Landing.jsx):

```jsx
<h1 className='text-2xl font-bold'>
  <span className='text-primary-400'>Auth</span>Flow{" "}
  {/* Change "Auth" and "Flow" */}
</h1>
```

### Add New Pages

1. Create new page in `src/pages/` folder
2. Add route in [src/App.jsx](./src/App.jsx)
3. Protect with ProtectedRoute if needed

Example:

```jsx
// src/pages/Settings.jsx
export const Settings = () => {
  return <div>Settings Page</div>;
};

// src/App.jsx
import { Settings } from "./pages/Settings";

// Add route:
<Route
  path='/settings'
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>;
```

## 📦 Production Build

### Create Optimized Build

```bash
npm run build
```

Output files will be in `dist/` folder.

### Preview Build Locally

```bash
npm run preview
```

### Deploy Options

#### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

#### Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

#### GitHub Pages

Add to `package.json`:

```json
"homepage": "https://yourusername.github.io/authentication"
```

Then:

```bash
npm run build
npm install --save-dev gh-pages
```

Update `package.json` scripts:

```json
"deploy": "npm run build && gh-pages -d dist"
```

#### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

Build and run:

```bash
docker build -t authflow .
docker run -p 5173:5173 authflow
```

## 🔄 Integration with Real Backend

### Step 1: Create Backend API

Use your preferred backend (Node.js, Python, etc.):

```javascript
// Example Node.js/Express
app.post("/api/signup", (req, res) => {
  // Your signup logic
  res.json({ success: true, user: userData });
});
```

### Step 2: Update API Calls

Modify [src/store/authStore.js](./src/store/authStore.js):

```javascript
// Change from mock API
export const useAuthStore = create((set, get) => ({
  signup: async (credentials) => {
    // Replace with real API call
    const response = await fetch("https://your-api.com/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    // ... rest of implementation
  },
}));
```

### Step 3: Disable Mock API

Comment out the mock API setup in [src/App.jsx](./src/App.jsx):

```jsx
useEffect(() => {
  // setupMockAPI(); // Disable this line
}, []);
```

## 🧪 Testing

### Run Manual Tests

1. **Signup Flow**
   - Fill signup form with valid data
   - Hit "Create Account" button
   - Enter any 6-digit OTP
   - Should redirect to dashboard

2. **Login Flow**
   - Use demo@example.com / Demo@123
   - Should redirect to dashboard
   - User info should display

3. **Protected Routes**
   - Logout from dashboard
   - Try accessing /dashboard directly
   - Should redirect to signin

4. **Form Validation**
   - Try invalid email format
   - Try password < 6 characters
   - Mismatched passwords
   - Each should show error

### Add Unit Tests

Install testing library:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

Create `src/components/Button.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("renders button with text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
```

Run tests:

```bash
npm run test
```

## 🔐 Security Checklist

Before production deployment:

- [ ] Change demo credentials
- [ ] Remove mock API for real backend
- [ ] Use HTTPS only (enforce in production)
- [ ] Add CSRF protection
- [ ] Implement rate limiting
- [ ] Use secure HTTP headers (HSTS, CSP)
- [ ] Add authentication timeout
- [ ] Implement refresh token rotation
- [ ] Use secure cookies (HttpOnly, Secure, SameSite)
- [ ] Sanitize all user inputs
- [ ] Add password requirements
- [ ] Implement account lockout after failed attempts
- [ ] Add activity logging
- [ ] Encrypt sensitive data in transit

## 📊 Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=AuthFlow
VITE_ENABLE_MOCK_API=false
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🚀 Performance Tips

1. **Lazy Load Components**

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>;
```

2. **Optimize Images**

- Use WebP format
- Compress with TinyPNG
- Use responsive images with srcset

3. **Code Splitting**

- React Router automatically handles this
- Check build output sizes

4. **Monitor Bundle Size**

```bash
npm install --save-dev webpack-bundle-analyzer
```

## 📝 Monitoring & Analytics

Add analytics to track usage:

```javascript
// Google Analytics
import ReactGA from "react-ga4";

ReactGA.initialize("GA_MEASUREMENT_ID");
ReactGA.send({ hitType: "pageview", page: "/dashboard" });
```

## 🐛 Debugging

### Enable Debug Mode

Add to console:

```javascript
localStorage.setItem("debug", "authflow:*");
```

### Network Debugging

- Open DevTools Network tab
- Monitor API calls
- Check response payloads

### State Debugging

- Install [Redux DevTools](https://redux-devtools-extension.com/)
- Works with Zustand via middleware

### Performance Profiling

- Use React DevTools Profiler
- Check for unnecessary re-renders
- Optimize with useMemo/useCallback

## 📞 Support & Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [GitHub Issues](https://github.com)

## 🎓 Next Steps

1. Add OAuth/Social Login (Google, GitHub, etc.)
2. Implement 2FA with authenticator apps
3. Add email verification
4. Implement reCAPTCHA
5. Add user dashboard customization
6. Implement activity logging
7. Add admin panel
8. Create mobile app with React Native

---

**Happy coding! 🚀**
