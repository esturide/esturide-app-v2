import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { LatLng } from '$libs/types/LatLng.ts';
import MapView from '@components/map/leaflet/view/MapView.tsx';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

type Props = {
  from: LatLng;
  to: LatLng;
  height?: number | string;
  position?: 'sticky' | 'absolute' | 'relative' | 'fixed';
  colorRoute?: string;
};

const StreetRoute: React.FC<Props> = ({
  from,
  to,
  height = '90vh',
  position = 'fixed',
  colorRoute = 'blue',
}) => {
  const RoutingMachine: React.FC<Props> = ({ from, to }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
        lineOptions: {
          styles: [{ color: colorRoute, weight: 5 }],
          extendToWaypoints: false,
          missingRouteTolerance: 0,
        },
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
      }).addTo(map);

      return () => {
        map.removeControl(routingControl);
      };
    }, [map, from, to]);

    return null;
  };

  return (
    <MapView
      center={[from.lat, from.lng]}
      zoom={6}
      style={{ height: height, width: '100%', position: position }}
    >
      <RoutingMachine from={from} to={to} />
    </MapView>
  );
};

export default StreetRoute;
