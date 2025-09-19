import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';

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
        <APIProvider apiKey={googleMapsApiKey}>
          <Map
            style={{ height: '100vh' }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling="greedy"
            disableDefaultUI
          >
            <DirectionsComponent />
          </Map>
        </APIProvider>
      </div>
    </>
  );
}

export default PreviewScheduleTravel;
