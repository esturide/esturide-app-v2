import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { LatLng } from '$libs/types/LatLng.ts';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import FullScreenContainer from '@layouts/container/FullScreenContainer.tsx';
import StreetRouteResponsive from '@components/map/StreetRouteResponsive.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import CenterElementsLayouts from '@layouts/container/CenterElementsLayouts.tsx';
import LocationsResponse from '$libs/request/response/location.ts';
import { searchLocationFromAddress } from '$libs/request/search.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import error from '$libs/toast/error.ts';
import loaderEffect from '$libs/loaderEffect.ts';
import ScheduleForm from '@components/forms/ScheduleForm.tsx';
import { LocationOption } from '$libs/const/defaultLocations.ts';

const defaultTravelFrom: LatLng = {
  lat: 20.56680439042432,
  lng: -103.22286936854996,
};

const defaultTravelTo: LatLng = {
  lat: 20.56680439042432,
  lng: -103.22286936854996,
};

function ScheduleTravel() {
  const navigate = useNavigate();
  const { role } = useUserManager();
  const { theme } = useUserTheme();

  const [loadingAddress, setLoadingAddress] = useState(false);
  const [fromLocation, setFromLocation] = useState<LatLng>(defaultTravelTo);
  const [toLocation, setToLocation] = useState<LatLng>(defaultTravelFrom);
  const [resultLocations, setResultLocations] = useState<LocationsResponse[]>(
    [],
  );

  const onSchedule = async (
    current: LocationOption,
    address: string,
    swap: boolean,
  ) => {
    await loaderEffect(async () => {
      if (address.length > 0) {
        const status = await searchLocationFromAddress(
          getRequestRoot(),
          address,
          setResultLocations,
        );

        console.log(current, address, swap);
        console.log(status);

        if (status) {
          if (resultLocations.length > 0) {
            const location = resultLocations[0];

            if (swap) {
              setFromLocation({
                lat: location.latitude,
                lng: location.longitude,
              });

              setToLocation(current.location);
            } else {
              setToLocation({
                lat: location.latitude,
                lng: location.longitude,
              });

              setFromLocation(current.location);
            }
          } else {
            await error('Direccion no encontrada.');
          }
        } else {
          await error('Hubo un problema con el servidor, intenta de nuevo.');
        }
      } else {
        await error('No puedes dejar la direccion en blanco.');
      }
    }, setLoadingAddress);
  };

  if (role !== 'driver') {
    return <Navigate to={'/home/travels'} replace />;
  }

  if (loadingAddress) {
    return (
      <FullScreenContainer>
        <CenterElementsLayouts>
          <SpinnerLoader />
        </CenterElementsLayouts>
      </FullScreenContainer>
    );
  }

  return (
    <FullScreenContainer>
      <div className={'flex max-lg:flex-col flex-row items-stretch'}>
        <ScheduleForm theme={theme} onSchedule={onSchedule} />

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
