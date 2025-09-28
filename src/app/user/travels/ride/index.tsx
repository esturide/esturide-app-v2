import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import ScheduleTravelCard from '@components/cards/resources/ScheduleTravelCard.tsx';
import UserData from '$libs/types/data/UserData.ts';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';
import ScheduleTravelData from '$libs/types/data/ScheduleTravelData.ts';
import { useTravelManagementContext } from '@/context/TravelManagementContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import React, { useEffect } from 'react';
import { FaCar } from 'react-icons/fa';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import GoogleMapRouting from '@components/map/google/GoogleMapRouting.tsx';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

const CurrentLocationMap = () => {
  const { watchPosition } = useWatchLivePositionContext();
  const { restoreCurrentTravel, currentSchedule } =
    useTravelManagementContext();
  const { googleApiKey, googleManagementMapApiKey } = useServiceApiManager();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const status = await restoreCurrentTravel();

      if (!status) {
        console.error('Failure restore current travel.');
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const CustomMarkerContent = () => {
    return (
      <div className={'bg-white rounded-full p-1.5 shadow-lg'}>
        <FaCar size={28} />
      </div>
    );
  };

  return (
    <GoogleMapView
      center={{
        lat: watchPosition.latitude,
        lng: watchPosition.longitude,
      }}
      apiKey={googleApiKey}
      mapId={googleManagementMapApiKey}
      zoom={3}
      style={{
        height: '100vh',
      }}
    >
      {currentSchedule && (
        <GoogleMapRouting
          origin={currentSchedule.origin.address}
          destination={currentSchedule.destination.address}
          catchNotFoundRoute={() => {}}
        />
      )}
      <AdvancedMarker
        position={{
          lat: watchPosition.latitude,
          lng: watchPosition.longitude,
        }}
        draggable={false}
        clickable={false}
      >
        <CustomMarkerContent />
      </AdvancedMarker>
    </GoogleMapView>
  );
};

function RequestRideTravel() {
  const navigate = useNavigate();

  const { role } = useUserManager();
  const { theme } = useUserTheme();
  const { watchPosition } = useWatchLivePositionContext();

  const user: UserData = {
    code: 0,
    firstName: 'Diego Sealtiel',
    paternalSurname: 'Valderrama',
    maternalSurname: 'Garcia',
    position: watchPosition,
  };

  const schedule: ScheduleTravelData = {
    uuid: '',
    driver: user,
    price: 1,
    terminate: false,
    cancel: false,
    maxPassengers: 3,
    seats: ['C'],
    origin: {
      longitude: 0,
      latitude: 0,
      address: 'CUCEI',
    },
    destination: {
      longitude: 0,
      latitude: 0,
      address: 'CUCEI',
    },
    rides: [],
    genderFilter: [],
  };

  if (role !== 'passenger') {
    return <Navigate to={'/home/travels'} replace />;
  }

  const onSearch = async () => {
    navigate('/home/travels/ride/current');
  };

  return <CurrentLocationMap />;
}

export default RequestRideTravel;
