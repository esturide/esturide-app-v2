import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as JotaiProvider } from 'jotai';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DeviceManagementProvider } from '@/context/DeviceManagment.tsx';

import UserIndex from '~/index.tsx';
import LoginPage from '~/login.tsx';
import UserRegister from '~/register';
import UserHome from '~/home';
import StreetRouteDemo from '~/demo/street-route.tsx';

import HomeLayout from '@layouts/route/HomeLayout.tsx';
import IndexLayout from '@layouts/route/IndexLayout.tsx';

import { UserManagerProvider } from '@/context/UserManager.tsx';

import '@/index.css';

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
