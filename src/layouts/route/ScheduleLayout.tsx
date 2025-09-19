import { Outlet } from 'react-router-dom';
import { useUserManager } from '@/context/UserManager.tsx';
import { ScheduleTravelProvider } from '@/context/ScheduleTravelContext.tsx';
import { Navigate } from 'react-router';
import { failureMessage } from '$libs/toast/failure.ts';
import { useEffect } from 'react';

function ScheduleLayout() {
  const { role } = useUserManager();

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
    <ScheduleTravelProvider>
      <Outlet />
    </ScheduleTravelProvider>
  );
}

export default ScheduleLayout;
