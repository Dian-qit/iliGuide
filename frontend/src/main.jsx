import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { AuthContextProvider } from './app/context/AuthContext.jsx'
import { ReactLenis } from 'lenis/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
          <App />
        </ReactLenis>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)