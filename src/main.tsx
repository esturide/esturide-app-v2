import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as JotaiProvider } from 'jotai';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DeviceManagementProvider } from '@/context/DeviceManagment.tsx';

import App from '@/App.tsx';
import LoginPage from '~/login.tsx';
import UserRegister from '~/register/user.tsx';
import StreetRouteDemo from '~/demo/street-route.tsx';

import { ThemeProvider } from '@/context/ThemeContext.tsx';
import { UserAuthProvider } from '@/context/UserAuthContext.tsx';

import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

const client = new ApolloClient({
  uri: 'https://api.esturide.com',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <JotaiProvider>
        <UserAuthProvider>
          <DeviceManagementProvider>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </DeviceManagementProvider>
        </UserAuthProvider>
      </JotaiProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
