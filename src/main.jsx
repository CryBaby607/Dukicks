// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Importa BrowserRouter
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Envuelve App en BrowserRouter para habilitar el enrutamiento */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)