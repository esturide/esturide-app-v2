import React, { PropsWithChildren } from 'react';
import { MapContainer } from 'react-leaflet';
import MapViewProps from '@components/map/MapViewProps.ts';
import TileLayerOpenStreet from '@components/map/leaflet/view/TileLayerOpenStreet.tsx';

import 'leaflet/dist/leaflet.css';
import '@styles/view/MapView.scss';

export default function MapView({
  center,
  zoom,
  children,
  style,
}: PropsWithChildren<MapViewProps>) {
  return (
    <div className={'map-container'}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={style}
        attributionControl={false}
      >
        <TileLayerOpenStreet />
        {children}
      </MapContainer>
    </div>
  );
}
