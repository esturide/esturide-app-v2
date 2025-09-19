import { useEffect, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import StreetRouteProps from '@components/map/StreetRouteProps.ts';

const DirectionsComponent = ({ origin, destination }: StreetRouteProps) => {
  const map = useMap();
  const [directions, setDirections] =
    useState<null | google.maps.DirectionsResult>(null);

  useEffect(() => {
    if (!map || !origin || !destination) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && status !== null) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      },
    );
  }, [map, origin, destination]);

  useEffect(() => {
    if (!map || !directions) return;

    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
    });

    directionsRenderer.setDirections(directions);

    return () => directionsRenderer.setMap(null);
  }, [map, directions]);

  return null;
};

export default DirectionsComponent;
