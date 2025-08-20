import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as JotaiProvider } from 'jotai';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DeviceManagementProvider } from '@/context/DeviceManagment.tsx';

import UserIndex from '~/index.tsx';
import LoginPage from '~/login.tsx';
import UserRegister from '~/register';
import UserTravels from '~/user/travels';
import UserNotify from '~/user/notify.tsx';
import UserProfile from '~/user/profile';
import UserSettings from '~/user/profile/settings.tsx';
import TravelSchedule from '~/user/travels/schedule';

import HomeLayout from '@layouts/route/HomeLayout.tsx';
import IndexLayout from '@layouts/route/IndexLayout.tsx';
import EmptyLayout from '@layouts/route/EmptyLayout.tsx';

import { UserManagerProvider } from '@/context/UserManager.tsx';

import { UserThemeProvider } from '@/context/UserTheme.tsx';
import { CookiesProvider } from 'react-cookie';

import { Notifications } from 'react-push-notification';
import { Bounce, ToastContainer } from 'react-toastify';

import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomeLayout />,
    children: [
      {
        index: true,
      },
      {
        path: 'travels',
        children: [
          {
            path: 'ride',
            children: [
              {
                index: true,
                element: <UserTravels />,
              },
            ],
          },
          {
            path: 'schedule',
            children: [
              {
                index: true,
                element: <TravelSchedule />,
              },
            ],
          },
        ],
      },
      {
        path: 'notify',
        element: <UserNotify />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
      {
        path: 'settings',
        element: <UserSettings />,
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
    element: <EmptyLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <UserRegister />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <JotaiProvider>
        <DeviceManagementProvider>
          <UserManagerProvider>
            <UserThemeProvider>
              <Notifications />
              <RouterProvider router={router} />
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
              />
            </UserThemeProvider>
          </UserManagerProvider>
        </DeviceManagementProvider>
      </JotaiProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
