import { BrowserRouter, Route, Routes } from 'react-router';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';

import '@/index.css';
import LoginPage from '~/login.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>,
);
