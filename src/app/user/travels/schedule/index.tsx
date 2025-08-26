import React, { useEffect, useState } from 'react';
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
import SelectOptions, {
  StringOption,
} from '@components/input/selector/SelectOptions.tsx';
import { useFormStatus } from 'react-dom';
import { searchLocationFromAddress } from '$libs/request/search.ts';
import LocationsResponse from '$libs/request/response/location.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import error from '$libs/toast/error.ts';
import loaderEffect from '$libs/loaderEffect.ts';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import CenterElementsLayouts from '@layouts/container/CenterElementsLayouts.tsx';

const defaultLocationList: StringOption[] = [
  {
    id: 0,
    description: 'CUTONALA',
  },
  {
    id: 1,
    description: 'CUCEI',
  },
  {
    id: 2,
    description: 'CUCSH',
  },
] as const;

function ScheduleTravel() {
  const navigate = useNavigate();
  const { role } = useUserManager();
  const { theme } = useUserTheme();
  const [currentOption, setCurrentOption] = useState(0);
  const [fromLocation, setFromLocation] = useState<LatLng>({
    lat: 20.566131156580823,
    lng: -103.29118486392122,
  });
  const [toLocation, setToLocation] = useState<LatLng>({
    lat: 20.566963187357228,
    lng: -103.22847750386998,
  });

  if (role !== 'driver') {
    return <Navigate to={'/home/travels'} replace />;
  }

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
      <div className={'flex justify-between items-center gap-2 flex-row'}>
        {children}
      </div>
    );
  };

  const ScheduleTravelForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('');
    const [locations, setLocations] = useState<LocationsResponse[]>([]);

    const onSearchAddress = async () => {
      const request = async () => {
        if (currentAddress.length != 0) {
          const status = await searchLocationFromAddress(
            getRequestRoot(),
            currentAddress,
            setLocations,
          );

          if (!status) {
            await error('Peticion invalida.');
          }
        }
      };

      await loaderEffect(request, setIsLoading);
    };

    useEffect(() => {
      if (locations.length > 0) {
        const location = locations[0];

        setToLocation({
          lat: location.latitude,
          lng: location.longitude,
        });
      }
    }, [locations]);

    const onSchedule = async (data: FormData) => {
      const address = data.get('address');

      if (typeof address === 'string' && address.length > 0) {
        setCurrentAddress(address);
      } else {
        await error('Direccion invalida.');
      }

      await onSearchAddress();
    };

    if (isLoading) {
      return (
        <FullScreenContainer>
          <CenterElementsLayouts>
            <SpinnerLoader />
          </CenterElementsLayouts>
        </FullScreenContainer>
      );
    }

    return (
      <form className={'grow p-4 lg:h-screen'} action={onSchedule}>
        <>
          <LayoutOption>
            <UserInputIcon
              icon={FaSearch}
              name={'address'}
              value={currentAddress}
            />

            <ChangeButton />
          </LayoutOption>

          <LayoutOption>
            <SelectOptions
              defaultValue={currentOption}
              options={defaultLocationList}
              onSelect={async (index: number) => {
                setCurrentOption(index);
              }}
            />

            <FilterButton />
          </LayoutOption>
        </>

        <div className={'flex flex-row gap-4 items-center'}>
          <CancelButton />

          <OptionButton label={'Agendar'} theme={theme} type={'submit'} />
        </div>
      </form>
    );
  };

  return (
    <FullScreenContainer>
      <div className={'flex max-lg:flex-col flex-row items-stretch'}>
        <ScheduleTravelForm />

        <div className={'flex-24'}>
          <StreetRouteResponsive
            from={fromLocation}
            to={toLocation}
            colorRoute={'#14b8a6'}
          />
        </div>
      </div>
    </FullScreenContainer>
  );
}

export default ScheduleTravel;
