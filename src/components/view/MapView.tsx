import { PropsWithChildren } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '@/styles/MapView.scss';

type Props = {
  center: LatLngExpression;
  zoom: number;
};

export default function MapView({
  center,
  zoom,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={'map-view'}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  );
}
