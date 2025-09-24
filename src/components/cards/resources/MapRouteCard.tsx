import React from 'react';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import GoogleMapRouting from '@components/map/google/GoogleMapRouting.tsx';
import Location from '$libs/types/Location.ts';

import '@styles/map/google-map-style.scss';

type Props = {
  defaultCenter: Location;
  addressFrom: string;
  addressTo: string;
  style?: React.CSSProperties;
  readonly?: boolean;
  showControls?: boolean;
};

function MapRouteCard({ defaultCenter, addressFrom, addressTo, style }: Props) {
  const { googleApiKey, googleManagementMapApiKey } = useServiceApiManager();

  return (
    <div
      className={
        'h-min border border-gray-200 rounded-xl overflow-hidden inset-shadow-sm'
      }
    >
      <GoogleMapView
        apiKey={googleApiKey}
        center={{
          lat: defaultCenter.latitude,
          lng: defaultCenter.longitude,
        }}
        mapId={googleManagementMapApiKey}
        zoom={10}
        style={style}
      >
        <GoogleMapRouting origin={addressTo} destination={addressFrom} />
      </GoogleMapView>
    </div>
  );
}

export default MapRouteCard;
