import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { useTravelManagementContext } from '@/context/TravelManagementContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { FaCar, FaMapMarkerAlt } from 'react-icons/fa';

import '@styles/map/google-map-style.scss';

function CurrentScheduleTravel() {
  const { currentSchedule } = useTravelManagementContext();
  const { googleApiKey, googleManagementMapApiKey } = useServiceApiManager();

  if (!currentSchedule) {
    return <Navigate to={'/'} replace />;
  }

  const CustomMarkerContent = () => {
    return (
      <div className={'bg-white rounded-full p-1.5 shadow-lg'}>
        <FaCar size={28} />
      </div>
    );
  };

  function CurrentLocationMap() {
    const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(
      null,
    );
    const [error, setError] = useState<string>('');

    useEffect(() => {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          pos => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });

            setError('');
          },
          err => {
            setError(err.message);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
        );

        return () => navigator.geolocation.clearWatch(watchId);
      } else {
        setError('Geolocation is not supported by your browser');
      }
    }, []);

    if (error != '') {
      return (
        <MainResponsiveLayout>
          <div>Error: {error}</div>
        </MainResponsiveLayout>
      );
    }

    if (!position) {
      return (
        <APIProvider apiKey={googleApiKey}>
          <Map
            zoom={3}
            style={{ height: '100vh' }}
            mapId={googleManagementMapApiKey}
          ></Map>
        </APIProvider>
      );
    }

    return (
      <APIProvider apiKey={googleApiKey}>
        <Map
          defaultCenter={position}
          defaultZoom={10}
          style={{ height: '100vh' }}
          mapId={googleManagementMapApiKey}
          zoomControl={false}
          streetViewControl={false}
          cameraControl={false}
          controlled={false}
          disableDefaultUI={true}
        >
          <AdvancedMarker
            position={position}
            draggable={false}
            clickable={false}
          >
            <CustomMarkerContent />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    );
  }

  return (
    <>
      <CurrentLocationMap />
    </>
  );
}

export default CurrentScheduleTravel;
