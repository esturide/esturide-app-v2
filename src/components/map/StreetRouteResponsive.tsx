import StreetRoute from '@components/map/StreetRoute.tsx';
import { LatLng } from '$libs/types/LatLng.ts';

type Props = {
  from: LatLng;
  to: LatLng;
  colorRoute?: string;
};

const StreetRouteResponsive = ({ from, to, colorRoute }: Props) => {
  return (
    <StreetRoute from={from} to={to} height={'100vh'} colorRoute={colorRoute} />
  );
};

export default StreetRouteResponsive;
