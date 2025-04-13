import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { LatLng } from '$libs/types/LatLng.ts';
import MapView from '@components/map/view/MapView.tsx';

import { Button } from '@headlessui/react';
import { FaSearch } from 'react-icons/fa';
import Control from 'react-leaflet-custom-control';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

type Props = {
  from: LatLng;
  to: LatLng;
};

const StreetRoute: React.FC<Props> = ({ from, to }) => {
  const RoutingMachine: React.FC<Props> = ({ from, to }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
        lineOptions: {
          styles: [{ color: '#0046ff', weight: 5 }],
          extendToWaypoints: false,
          missingRouteTolerance: 0,
        },
        routeWhileDragging: true,
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
      style={{ height: '100vh', width: '100%' }}
    >
      <div>
        <p>Hello world</p>
      </div>
      <RoutingMachine from={from} to={to} />
    </MapView>
  );
};

export default StreetRoute;
