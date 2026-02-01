import React, { PropsWithChildren } from 'react';
import MapViewProps from '@components/map/MapViewProps.ts';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

interface Props extends MapViewProps {
  draggable?: boolean;
}

export default function GoogleMapView({
  center,
  zoom,
  children,
  style,
  apiKey = '',
  mapId = '',
  draggable = true,
}: PropsWithChildren<Props>) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center as google.maps.LatLngLiteral}
        defaultZoom={zoom}
        style={style}
        mapId={mapId}
        scrollwheel={draggable}
        disableDefaultUI
      >
        {children}
      </Map>
    </APIProvider>
  );
}
