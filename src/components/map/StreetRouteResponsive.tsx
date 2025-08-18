import StreetRoute from '@components/map/StreetRoute.tsx';
import conditionState from '$libs/conditions.ts';
import { isMobile } from 'react-device-detect';
import { LatLng } from '$libs/types/LatLng.ts';

type Props = {
  from: LatLng;
  to: LatLng;
  colorRoute?: string;
};

const StreetRouteResponsive = ({ from, to, colorRoute }: Props) => {
  return (
    <StreetRoute
      from={from}
      to={to}
      height={conditionState(isMobile, '90vh', '100vh')}
      colorRoute={colorRoute}
    />
  );
};

export default StreetRouteResponsive;
