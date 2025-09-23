import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as JotaiProvider } from 'jotai';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Notifications } from 'react-push-notification';
import { Bounce, ToastContainer } from 'react-toastify';

import { DeviceManagementProvider } from '@/context/DeviceManagment.tsx';

import ErrorPage from '~/boundary/error';
import ResourcesNotAvailable from '~/boundary/resources-not-available.tsx';
import UserIndex from '~/index.tsx';
import UserHome from '~/user';
import LoginPage from '~/login.tsx';
import UserRegister from '~/register';
import UserTravels from '~/user/travels';
import UserNotify from '~/user/notify.tsx';
import UserProfile from '~/user/profile';
import UserSettings from '~/user/profile/settings.tsx';
import ScheduleTravel from '~/user/travels/schedule';
import PreviewScheduleTravel from '~/user/travels/schedule/preview.tsx';
import ScheduleConfig from '~/user/travels/schedule/config.tsx';
import CurrentScheduleTravel from '~/user/travels/schedule/current.tsx';

import RideTravel from '~/user/travels/ride';
import HomeLayout from '@layouts/route/HomeLayout.tsx';
import IndexLayout from '@layouts/route/IndexLayout.tsx';
import EmptyLayout from '@layouts/route/EmptyLayout.tsx';
import ScheduleLayout from '@layouts/route/ScheduleLayout.tsx';

import TravelLayout from '@layouts/route/TravelLayout.tsx';

import { UserManagerProvider } from '@/context/UserManager.tsx';
import { UserThemeProvider } from '@/context/UserTheme.tsx';

import '@/index.css';
import { ServiceApiKeyProvider } from '@/context/ServiceApiKeyManager.tsx';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserHome />,
      },
      {
        path: 'travels',
        element: <TravelLayout />,
        children: [
          {
            index: true,
            element: <UserTravels />,
          },
          {
            path: 'ride',
            children: [
              {
                index: true,
                element: <RideTravel />,
              },
            ],
          },
          {
            path: 'schedule',
            element: <ScheduleLayout />,
            children: [
              {
                index: true,
                element: <ScheduleTravel />,
              },
              {
                path: 'preview',
                element: <PreviewScheduleTravel />,
              },
              {
                path: 'config',
                element: <ScheduleConfig />,
              },
              {
                path: 'current',
                element: <CurrentScheduleTravel />,
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserIndex />,
      },
      {
        path: '/resource-not-available',
        element: <ResourcesNotAvailable />,
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
              <ServiceApiKeyProvider>
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
              </ServiceApiKeyProvider>
            </UserThemeProvider>
          </UserManagerProvider>
        </DeviceManagementProvider>
      </JotaiProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
