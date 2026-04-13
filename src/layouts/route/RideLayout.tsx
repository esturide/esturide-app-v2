import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router';
import { failureMessage } from '$libs/toast/failure.ts';
import { PassengerManagementProvider } from '@/context/PassengerManagementContext.tsx';
import { useUserManagerContext } from '@/context/UserManagementContext.tsx';
import { RideTravelManagementProvider } from '@/context/RideTravelManagmentContext.tsx';

function RideLayout() {
  const { role } = useUserManagerContext();

  const FailureNavigate = () => {
    useEffect(() => {
      failureMessage('You cannot access this feature with your role.');
    }, []);

    return <Navigate to={'/home/travels'} replace />;
  };

  if (role !== 'passenger') {
    return <FailureNavigate />;
  }

  return (
    <RideTravelManagementProvider>
      <PassengerManagementProvider>
        <Outlet />
      </PassengerManagementProvider>
    </RideTravelManagementProvider>
  );
}

export default RideLayout;
