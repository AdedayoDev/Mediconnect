import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setupMockAPI } from './api/mockAPI'
import { apiHealthCheck } from './api/realAPI'

const root = createRoot(document.getElementById('root'));

async function bootstrap() {
  const status = await apiHealthCheck();

  if (!status.online) {
    console.warn(
      'Backend appears offline, enabling mock API fallback. Start backend at http://localhost:5000 to use real API.',
    );
    setupMockAPI();
  }

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();
