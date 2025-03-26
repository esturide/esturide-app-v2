import { PropsWithChildren } from 'react';
import { MapContainer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';

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
    <>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        {children}
      </MapContainer>
    </>
  );
}
