import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { useTravelManagementContext } from '@/context/TravelManagementContext.tsx';
import { Navigate } from 'react-router';

function CurrentScheduleTravel() {
  const { currentSchedule } = useTravelManagementContext();

  if (!currentSchedule) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <MainResponsiveLayout>
      <p>Current travel</p>
      <p>{currentSchedule.driver.code}</p>
    </MainResponsiveLayout>
  );
}

export default CurrentScheduleTravel;
