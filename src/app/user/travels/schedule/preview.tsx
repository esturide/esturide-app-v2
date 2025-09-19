import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import MapView from '@components/map/google/view/MapView.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';

interface LocationState {
  readonly addressFrom: string;
  readonly addressTo: string;
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function PreviewScheduleTravel() {
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const origin = addressTo;
  const destination = addressFrom;

  const DirectionsComponent = () => {
    const map = useMap();
    const [directions, setDirections] =
      useState<null | google.maps.DirectionsResult>(null);

    useEffect(() => {
      if (!map || !origin || !destination) {
        return;
      }

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: addressTo,
          destination: addressFrom,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && status !== null) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        },
      );
    }, [map, origin, destination]);

    useEffect(() => {
      if (!map || !directions) return;

      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
      });

      directionsRenderer.setDirections(directions);

      return () => directionsRenderer.setMap(null);
    }, [map, directions]);

    return null;
  };

  return (
    <>
      <div className={'flex'}>
        <GoogleMapView
          apiKey={googleMapsApiKey}
          center={{
            lat: 20.566646720860327,
            lng: -103.22860101349919,
          }}
          style={{
            height: '100vh',
          }}
        >
          <DirectionsComponent />
        </GoogleMapView>
      </div>
    </>
  );
}

export default PreviewScheduleTravel;
