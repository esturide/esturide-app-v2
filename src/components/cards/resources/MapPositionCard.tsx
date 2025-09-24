import React from 'react';
import Location from '$libs/types/Location.ts';
import { Marker } from '@vis.gl/react-google-maps';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';

import '@styles/map/google-map-style.scss';

type Props = {
  position: Location;
  style?: React.CSSProperties;
  readonly?: boolean;
  showControls?: boolean;
};

const MapPositionCard = ({ position, style, readonly = false }: Props) => {
  const { googleApiKey, googleManagementMapApiKey } = useServiceApiManager();

  return (
    <div
      className={
        'h-min border border-gray-200 rounded-xl overflow-hidden inset-shadow-sm'
      }
    >
      <GoogleMapView
        apiKey={googleApiKey}
        mapId={googleManagementMapApiKey}
        zoom={15}
        center={{
          lat: position.latitude,
          lng: position.longitude,
        }}
        style={style}
        draggable={readonly}
      >
        <Marker
          position={{
            lat: position.latitude,
            lng: position.longitude,
          }}
        />
      </GoogleMapView>
    </div>
  );
};

export default MapPositionCard;
