import { useState } from 'react';
import ResponsiveLayout from '@layouts/view/ResponsiveLayout.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import StreetRoute from '@components/map/StreetRoute.tsx';
import ScheduleTravelMessage from '@components/resources/message/ScheduleTravelMessage.tsx';

import {
  FaAngleDown,
  FaExchangeAlt,
  FaFilter,
  FaPlus,
  FaSearch,
} from 'react-icons/fa';

import { LatLng } from '$libs/types/LatLng.ts';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import BigButton from '@components/buttons/BigButton.tsx';

type StateView = 'view' | 'schedule' | 'driving' | 'unknown';
const defaultDestination = 'CUTONALA';

const ScheduleTravelView = () => {
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
      <ResponsiveLayout>
        <div className={'flex flex-row justify-between gap-2 m-1'}>
          <div className={'grow flex flex-col gap-2'}>
            <UserInputIcon icon={FaSearch} />
            <UserInputIcon
              icon={FaAngleDown}
              value={defaultDestination}
              readOnly
            />
          </div>

          <div className={'flex flex-col gap-2 justify-center items-center'}>
            <IconButton icon={FaExchangeAlt} color={'teal'} />
            <IconButton icon={FaFilter} color={'teal'} />
          </div>
        </div>
        <div className={'flex flex-col gap-4 mb-2 justify-between'}>
          <BigButton label={'Agendar'} />
        </div>
      </ResponsiveLayout>
    );
  };

  return (
    <>
      <div className={'flex flex-col'}>
        <div className={'grow'}>
          <ScheduleConfigure />
        </div>

        <div className={'grow'}>
          <StreetRoute
            from={from}
            to={to}
            position={'sticky'}
            height={'100vh'}
          ></StreetRoute>
        </div>
      </div>
    </>
  );
};

const DrivingTravelView = () => {
  return <></>;
};

function UserTravels() {
  const [currentState, setCurrentState] = useState<StateView>('view');

  if (currentState == 'schedule') {
    return <ScheduleTravelView />;
  } else if (currentState === 'driving') {
    return <DrivingTravelView />;
  }

  return (
    <ResponsiveLayout>
      <div className={'flex flex-col gap-4 my-3'}>
        <div className={'grow'}>
          <ScheduleTravelMessage />
        </div>

        <div className={'flex flex-row justify-end items-end align-bottom'}>
          <div className={'relative'}>
            <IconButton
              icon={FaPlus}
              onClick={async () => {
                setCurrentState('schedule');
              }}
              color={'teal'}
            />
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}

export default UserTravels;
