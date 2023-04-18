import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { GlobalStoreProvider } from './context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStoreProvider>
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              background: '#fff',
              color: '#000',
              fontSize: '15px'
            }
          }}
        />
        <App />
      </GlobalStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
