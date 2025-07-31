import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as JotaiProvider } from 'jotai';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DeviceManagementProvider } from '@/context/DeviceManagment.tsx';

import LoginPage from '~/login.tsx';
import UserRegister from '~/register';
import StreetRouteDemo from '~/demo/street-route.tsx';
import UserHome from '~/home';

import HomeLayout from '@layouts/route/HomeLayout.tsx';

import '@/index.css';
import { UserManagerProvider } from '@/context/UserManager.tsx';
import UserIndex from '@/app';
import IndexLayout from '@layouts/route/IndexLayout.tsx';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <UserHome />,
      },
    ],
  },
  {
    path: '/',
    element: <IndexLayout />,
    children: [
      {
        index: true,
        element: <UserIndex />,
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
    <JotaiProvider>
      <DeviceManagementProvider>
        <UserManagerProvider>
          <RouterProvider router={router} />
        </UserManagerProvider>
      </DeviceManagementProvider>
    </JotaiProvider>
  </React.StrictMode>,
);
