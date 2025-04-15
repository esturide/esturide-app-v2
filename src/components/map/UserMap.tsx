import { LatLng } from '$libs/types/LatLng.ts';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import MapView from '@components/map/view/MapView.tsx';

type Props = {
  from: LatLng;
  to: LatLng;
  waypoints: LatLng[];

  current: LatLng; // Driver | Passenger
  others: LatLng[]; // Passengers | Driver
};

const UserMap: React.FC<Props> = ({ from, to, waypoints, current, others }) => {
  const RoutingMachine: React.FC<Props> = ({
    from,
    to,
    waypoints,
    current,
    others,
  }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(from.lat, from.lng),
          ...waypoints.map(point => L.latLng(point.lat, point.lng)),
          L.latLng(to.lat, to.lng),
        ],
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
      {/* Driver */}
      {/* Passengers */}

      <RoutingMachine
        from={from}
        to={to}
        waypoints={waypoints}
        current={current}
        others={others}
      />
    </MapView>
  );
};

export default UserMap;
