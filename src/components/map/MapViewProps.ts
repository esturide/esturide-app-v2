import { LatLngExpression } from 'leaflet';
import React from 'react';

interface MapViewProps {
  center: LatLngExpression | google.maps.LatLngLiteral;
  zoom?: number;
  style?: React.CSSProperties;
  apiKey?: string;
  mapId?: string;
}

export default MapViewProps;
