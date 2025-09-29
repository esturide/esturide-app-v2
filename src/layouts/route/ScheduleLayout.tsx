import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router';
import { failureMessage } from '$libs/toast/failure.ts';
import { DriverManagementProvider } from '@/context/DriverManagementContext.tsx';
import { useUserManagerContext } from '@/context/UserManagementContext.tsx';

function ScheduleLayout() {
  const { role } = useUserManagerContext();

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
    <DriverManagementProvider>
      <Outlet />
    </DriverManagementProvider>
  );
}

export default ScheduleLayout;
