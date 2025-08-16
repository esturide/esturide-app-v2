import React, { PropsWithChildren } from 'react';
import { MapContainer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import TileLayerOpenStreet from '@components/map/view/TileLayerOpenStreet.tsx';

import 'leaflet/dist/leaflet.css';
import '@styles/view/MapView.scss';

export type MapViewProps = {
  center: LatLngExpression;
  zoom: number;
  style?: React.CSSProperties;
};

export default function MapView({
  center,
  zoom,
  children,
  style = undefined,
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
