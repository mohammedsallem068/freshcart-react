import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { HeadProvider } from 'react-head';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeadProvider>
      <App />
    </HeadProvider>
  </StrictMode>,
)
