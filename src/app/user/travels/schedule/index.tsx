import { FaAngleDown, FaExchangeAlt, FaFilter, FaSearch } from 'react-icons/fa';
import { LatLng } from '$libs/types/LatLng.ts';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import OptionButton from '@components/buttons/OptionButton.tsx';
import StreetRouteResponsive from '@components/map/StreetRouteResponsive.tsx';
import { Navigate } from 'react-router';

const defaultDestination = 'CUTONALA';

function ScheduleTravel() {
  const { role } = useUserManager();
  const { theme } = useUserTheme();

  if (role !== 'driver') {
    return <Navigate to={'/home/travels'} replace />;
  }

  const from: LatLng = {
    lat: 20.566131156580823,
    lng: -103.29118486392122,
  };

  const to: LatLng = {
    lat: 20.566963187357228,
    lng: -103.22847750386998,
  };

  const ScheduleConfigure = () => {
    return (
      <>
        <div className={'flex flex-row justify-between gap-2'}>
          <div className={'grow flex flex-col gap-2'}>
            <UserInputIcon icon={FaSearch} />
            <UserInputIcon
              icon={FaAngleDown}
              value={defaultDestination}
              readOnly
            />
          </div>

          <div className={'flex flex-col gap-2 justify-center items-center'}>
            <IconButton icon={FaExchangeAlt} theme={theme} />
            <IconButton icon={FaFilter} theme={theme} />
          </div>
        </div>
        <div className={'flex flex-col gap-4 mt-4 mb-2 justify-between'}>
          <OptionButton label={'Agendar'} theme={theme} />
        </div>
      </>
    );
  };

  return (
    <>
      <div className={'flex flex-col sm:flex-row'}>
        <div className={'p-4 justify-between items-center'}>
          <ScheduleConfigure />
        </div>

        <div className={'flex-1'}>
          <StreetRouteResponsive from={from} to={to} colorRoute={'#14b8a6'} />
        </div>
      </div>
    </>
  );
}

export default ScheduleTravel;
