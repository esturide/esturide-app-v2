import { useState } from 'react';
import ResponsiveLayout from '@layouts/view/ResponsiveLayout.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import ScheduleTravelMessage from '@components/resources/message/ScheduleTravelMessage.tsx';

import { FaAngleDown, FaExchangeAlt, FaFilter, FaSearch } from 'react-icons/fa';

import { LatLng } from '$libs/types/LatLng.ts';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import BigButton from '@components/buttons/BigButton.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';
import StreetRouteResponsive from '@components/map/StreetRouteResponsive.tsx';

type StateView = 'view' | 'schedule' | 'driving' | 'unknown';
const defaultDestination = 'CUTONALA';

const ScheduleTravelView = () => {
  const { theme } = useUserTheme();

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
          <BigButton label={'Agendar'} theme={theme} />
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
};

const DrivingTravelView = () => {
  return <></>;
};

function UserTravels() {
  const { theme } = useUserTheme();
  const [currentState, setCurrentState] = useState<StateView>('view');

  if (currentState == 'schedule') {
    return <ScheduleTravelView />;
  } else if (currentState === 'driving') {
    return <DrivingTravelView />;
  }

  return (
    <ResponsiveLayout>
      <div className={'flex flex-col'}>
        <ScheduleTravelMessage />

        <BigButton
          label={'Agendar'}
          theme={theme}
          onClick={async () => {
            setCurrentState('schedule');
          }}
        />
      </div>
    </ResponsiveLayout>
  );
}

export default UserTravels;
