import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { LatLng } from '$libs/types/LatLng.ts';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import StreetRouteResponsive from '@components/map/StreetRouteResponsive.tsx';
import FullScreenContainer from '@layouts/container/FullScreenContainer.tsx';
import ScheduleTravelForm from '@components/forms/ScheduleTravelForm.tsx';

function ScheduleTravel() {
  const navigate = useNavigate();
  const { role } = useUserManager();
  const { theme } = useUserTheme();
  const [fromLocation, setFromLocation] = useState<LatLng>({
    lat: 20.566131156580823,
    lng: -103.29118486392122,
  });
  const [toLocation, setToLocation] = useState<LatLng>({
    lat: 20.566963187357228,
    lng: -103.22847750386998,
  });

  if (role !== 'driver') {
    return <Navigate to={'/home/travels'} replace />;
  }

  return (
    <FullScreenContainer>
      <div className={'flex max-lg:flex-col flex-row items-stretch'}>
        <ScheduleTravelForm
          theme={theme}
          onCancel={async () => {
            navigate(-1);
          }}
          onSchedule={async (current, address, swap) => {
            console.log(current, address, swap);
          }}
        />

        <div className={'flex-10'}>
          <StreetRouteResponsive
            from={fromLocation}
            to={toLocation}
            colorRoute={'#14b8a6'}
          />
        </div>
      </div>
    </FullScreenContainer>
  );
}

export default ScheduleTravel;
