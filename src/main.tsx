import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'jotai';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DeviceManagementProvider } from '@/context/DeviceManagment.tsx';

import App from '@/App.tsx';
import LoginPage from '~/login.tsx';
import UserRegister from '~/register/user.tsx';
import StreetRouteDemo from '~/demo/street-route.tsx';
import UserHome from '~/home';

import { UserAuthProvider } from '@/context/UserAuthContext.tsx';
import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserHome />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <UserRegister />,
  },
  {
    path: '/street-route',
    element: <StreetRouteDemo />,
  },
  {
    path: '/home',
    element: <UserHome />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <UserAuthProvider>
        <DeviceManagementProvider>
          <RouterProvider router={router} />
        </DeviceManagementProvider>
      </UserAuthProvider>
    </Provider>
  </React.StrictMode>,
);
