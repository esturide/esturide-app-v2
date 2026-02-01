import React, { useEffect } from 'react';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';
import { useSessionManagementProvider } from '@/context/SessionManagementContext.tsx';
import { recordCurrentLocation } from '$libs/request/record.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import { useUserManagerContext } from '@/context/UserManagementContext.tsx';

const RecordLocationLayout = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated } = useUserManagerContext();
  const { watchPosition } = useWatchLivePositionContext();
  const { updateCurrentSession } = useSessionManagementProvider();

  useEffect(() => {
    const request = async () => {
      if (isAuthenticated) {
        const userSession = await updateCurrentSession();

        if (userSession.rideFound || userSession.scheduleFound) {
          await recordCurrentLocation(getRequestRoot(), watchPosition);
        }
      }
    };

    request();
  }, [watchPosition]);

  return <>{children}</>;
};

export default RecordLocationLayout;
