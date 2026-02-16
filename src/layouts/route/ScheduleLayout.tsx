import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router';
import { failureMessage } from '$libs/toast/failure.ts';
import { DriverManagementProvider } from '@/context/DriverManagementContext.tsx';
import { useUserManagerContext } from '@/context/UserManagementContext.tsx';
import { ScheduleTravelManagementProvider } from '@/context/ScheduleTravelManagementContext.tsx';
import { SocketManagerProvider } from '@/context/SocketManagerContext.tsx';

function ScheduleLayout() {
  const { role } = useUserManagerContext();
  const { authToken } = useUserManagerContext();

  const FailureNavigate = () => {
    useEffect(() => {
      failureMessage('You cannot access this feature with your role.');
    }, []);

    return <Navigate to={'/home/travels'} replace />;
  };

  if (role !== 'driver') {
    return <FailureNavigate />;
  }

  return (
    <SocketManagerProvider
      namespace={'travel'}
      token={authToken}
      eventListener={['current']}
    >
      <ScheduleTravelManagementProvider>
        <DriverManagementProvider>
          <Outlet />
        </DriverManagementProvider>
      </ScheduleTravelManagementProvider>
    </SocketManagerProvider>
  );
}

export default ScheduleLayout;
