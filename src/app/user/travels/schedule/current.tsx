import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { FaCar } from 'react-icons/fa';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useTravelManagementContext } from '@/context/TravelManagementContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import GoogleMapRouting from '@components/map/google/GoogleMapRouting.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';

import '@styles/map/google-map-style.scss';

function CurrentLocationMap() {
  const { currentSchedule } = useTravelManagementContext();
  const { googleApiKey, googleManagementMapApiKey } = useServiceApiManager();

  const [position, setPosition] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [watchError, setWatchError] = useState<boolean>(false);

  const CustomMarkerContent = () => {
    return (
      <div className={'bg-white rounded-full p-1.5 shadow-lg'}>
        <FaCar size={28} />
      </div>
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        pos => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });

          setWatchError(false);
        },
        err => {
          console.error('Error getting location:', err);

          setWatchError(true);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setWatchError(true);
    }
  }, []);

  if (watchError) {
    return (
      <GoogleMapView
        center={position}
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
      </GoogleMapView>
    );
  }

  return (
    <GoogleMapView
      center={position}
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
      <AdvancedMarker position={position} draggable={false} clickable={false}>
        <CustomMarkerContent />
      </AdvancedMarker>
    </GoogleMapView>
  );
}

function CurrentScheduleTravel() {
  const { currentSchedule } = useTravelManagementContext();

  if (!currentSchedule) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <>
      <CurrentLocationMap />
    </>
  );
}

export default CurrentScheduleTravel;
