import React from 'react';
import { TileLayer } from 'react-leaflet';

const TileLayerOpenStreet: React.FC = () => {
  return (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
  );
};

export default TileLayerOpenStreet;
