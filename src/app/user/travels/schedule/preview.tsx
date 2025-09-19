import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

interface LocationState {
  readonly addressFrom: string;
  readonly addressTo: string;
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function PreviewScheduleTravel() {
  console.log(googleMapsApiKey);

  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const navigate = useNavigate();

  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <APIProvider apiKey={googleMapsApiKey}>
      <Map
        style={{ height: '100vh' }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling="greedy"
        disableDefaultUI
      />
    </APIProvider>
  );
}

export default PreviewScheduleTravel;
