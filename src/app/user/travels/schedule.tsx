import StreetRoute from '@components/map/StreetRoute.tsx';
import { LatLng } from '$libs/types/LatLng.ts';

function ScheduleTravel() {
  const from: LatLng = {
    lng: 0,
    lat: 0,
  };

  const to: LatLng = {
    lng: 0,
    lat: 0,
  };

  return (
    <>
      <StreetRoute from={from} to={to} height={'90vh'}></StreetRoute>
    </>
  );
}

export default ScheduleTravel;
