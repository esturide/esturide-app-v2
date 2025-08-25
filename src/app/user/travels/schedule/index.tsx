import React from 'react';
import { Navigate } from 'react-router';
import { FaExchangeAlt, FaFilter, FaSearch } from 'react-icons/fa';
import { LatLng } from '$libs/types/LatLng.ts';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import OptionButton from '@components/buttons/OptionButton.tsx';
import StreetRouteResponsive from '@components/map/StreetRouteResponsive.tsx';
import FullScreenContainer from '@layouts/container/FullScreenContainer.tsx';
import { TiCancel } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

function ScheduleTravel() {
  const navigate = useNavigate();
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

  const CancelButton = () => {
    return (
      <IconButton
        icon={TiCancel}
        theme={'gray'}
        onClick={async () => {
          navigate('/home/travels', { replace: true });
        }}
      />
    );
  };

  const FilterButton = () => {
    return <IconButton icon={FaFilter} theme={theme} />;
  };

  const ChangeButton = () => {
    return <IconButton icon={FaExchangeAlt} theme={theme} />;
  };

  const LayoutOption = ({ children }: React.PropsWithChildren) => {
    return (
      <div className={'flex justify-between gap-2 py-2 flex-row'}>
        {children}
      </div>
    );
  };

  const ScheduleTravelForm = () => {
    return (
      <form className={'grow px-4 lg:h-screen'}>
        <>
          <LayoutOption>
            <UserInputIcon icon={FaSearch} />

            <FilterButton />
          </LayoutOption>

          <LayoutOption>
            <UserInputIcon icon={FaSearch} />

            <ChangeButton />
          </LayoutOption>
        </>

        <div className={'flex flex-row gap-4 py-4 items-center'}>
          <CancelButton />

          <OptionButton label={'Agendar'} theme={theme} />
        </div>
      </form>
    );
  };

  return (
    <FullScreenContainer>
      <div className={'flex max-lg:flex-col flex-row items-stretch'}>
        <ScheduleTravelForm />

        <div className={'flex-24'}>
          <StreetRouteResponsive from={from} to={to} colorRoute={'#14b8a6'} />
        </div>
      </div>
    </FullScreenContainer>
  );
}

export default ScheduleTravel;
