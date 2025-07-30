import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DeviceManagementProvider } from '@/context/DeviceManagment.tsx';

import LoginPage from '~/login.tsx';
import UserRegister from '~/register';
import StreetRouteDemo from '~/demo/street-route.tsx';
import UserHome from '~/home';

import HomeLayout from '@layouts/route/HomeLayout.tsx';

import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <UserHome />,
      },
    ],
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DeviceManagementProvider>
      <RouterProvider router={router} />
    </DeviceManagementProvider>
  </React.StrictMode>,
);
