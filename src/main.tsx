import { createRoot } from 'react-dom/client';

import 'antd/dist/reset.css';

import App from './App';
import LayoutContextProvider from 'context/layout';

createRoot(document.getElementById('root')!).render(
  <LayoutContextProvider>
    <App />
  </LayoutContextProvider>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('Service Worker registrado:', reg.active))
      .catch((err) => console.log('Error registrando SW:', err));
  });
}
