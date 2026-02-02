import React, { PropsWithChildren, useEffect } from 'react';
import MapViewProps from '@components/map/MapViewProps.ts';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useJsApiLoader } from '@react-google-maps/api';

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
  const { isLoaded } = useJsApiLoader({
    id: mapId,
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    console.log(`Google API loading status: ${isLoaded}`);
  }, [isLoaded]);

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
