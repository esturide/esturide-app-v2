import React from 'react';
import StreetRoute from '@components/map/StreetRoute.tsx';

const StreetRouteDemo: React.FC = () => {
  return (
    <>
      <StreetRoute
        from={{ lat: 20.566131156580823, lng: -103.29118486392122 }}
        to={{ lat: 20.566963187357228, lng: -103.22847750386998 }}
      />
    </>
  );
};

export default StreetRouteDemo;
