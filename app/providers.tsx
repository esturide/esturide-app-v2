'use client';

import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as JotaiProvider } from 'jotai';
import { DeviceManagementProvider } from '../src/context/DeviceManagment';
import { UserManagerProvider } from '../src/context/UserManager';
import { UserThemeProvider } from '../src/context/UserTheme';
import { Notifications } from 'react-push-notification';
import { Bounce, ToastContainer } from 'react-toastify';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <JotaiProvider>
        <DeviceManagementProvider>
          <UserManagerProvider>
            <UserThemeProvider>
              <Notifications />
              {children}
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
  );
}
