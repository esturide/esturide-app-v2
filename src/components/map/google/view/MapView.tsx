import React, { PropsWithChildren } from 'react';
import MapViewProps from '@components/map/MapViewProps.ts';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

export default function GoogleMapView({
  center,
  zoom,
  children,
  style,
  apiKey = '',
  mapId = '',
}: PropsWithChildren<MapViewProps>) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center as google.maps.LatLngLiteral}
        defaultZoom={zoom}
        style={style}
        mapId={mapId}
        disableDefaultUI
      >
        {children}
      </Map>
    </APIProvider>
  );
}
