import { StrictMode } from 'react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react';
import { registerSW } from 'virtual:pwa-register';

registerSW();
import StoreContextProvider from './contexts/StoreContext.jsx'

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
        <BrowserRouter>
          <StoreContextProvider>
            <App />
          </StoreContextProvider>
        </BrowserRouter>,
    </ClerkProvider>
  </React.StrictMode>
)
