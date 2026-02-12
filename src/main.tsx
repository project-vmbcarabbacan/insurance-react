import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { setup } from './di/setup';
import { Provider } from 'react-redux';
import { store } from './app/stores/store.ts';
import App from './App.tsx'

setup();

// console.log = () => { }
// console.warn = () => { }
// console.error = () => { }
// console.info = () => { }
// console.debug = () => { }

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
