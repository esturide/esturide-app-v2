import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import FullScreenContainer from '@layouts/container/FullScreenContainer.tsx';
import CenterElementsLayouts from '@layouts/container/CenterElementsLayouts.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import { searchLocationFromAddress } from '$libs/request/search.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import {
  requestCurrentScheduleTravel,
  requestScheduleTravel,
} from '$libs/request/schedule.ts';
import ScheduleState from '$libs/request/response/ScheduleState.ts';
import Location from '$libs/types/Location.ts';
import LocationAddress from '$libs/types/LocationAddress.ts';
import loaderEffect from '$libs/loaderEffect.ts';
import ScheduleResponse from '$libs/request/response/ScheduleResponse.ts';
import ValueState from '$libs/types/ValueState.ts';

interface AddressResult {
  readonly address: string;
  readonly results: LocationAddress[];
}

interface ScheduleTravelProps {
  scheduleTravel: (state: ScheduleState) => Promise<boolean>;
  searchAddress: (
    address: string,
    setResults: (results: AddressResult) => void,
  ) => Promise<boolean>;
  currentSchedule: ValueState<ScheduleResponse>;
}

const ScheduleTravel = createContext<ScheduleTravelProps>({
  currentSchedule: {
    state: false,
  },
  scheduleTravel: async () => {
    return false;
  },
  searchAddress: async () => {
    return false;
  },
});

export const ScheduleTravelProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentSchedule, setCurrentSchedule] = useState<
    ValueState<ScheduleResponse>
  >({
    state: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const restoreCurrentTravel = async () => {
    let status = false;

    await loaderEffect(async () => {
      status = await requestCurrentScheduleTravel(
        getRequestRoot(),
        (schedule: ScheduleResponse) => {
          setCurrentSchedule({
            state: true,
            value: schedule,
          });
        },
      );
    }, setIsLoading);

    return status;
  };

  useEffect(() => {
    restoreCurrentTravel();
  }, []);

  const scheduleTravel = async (schedule: ScheduleState) => {
    const swapTravel: boolean = schedule.returnHome;

    const currentAddress = swapTravel
      ? schedule.from.address
      : schedule.to.address;
    const currentLocation: Location = swapTravel
      ? {
          longitude: schedule.to.longitude,
          latitude: schedule.to.latitude,
        }
      : {
          longitude: schedule.from.longitude,
          latitude: schedule.from.latitude,
        };

    let status = false;

    await loaderEffect(async () => {
      status = await requestScheduleTravel(getRequestRoot(), {
        maxPassengers: schedule.maxPassengers,
        seats: schedule.seats,
        a: currentAddress,
        b: currentLocation,
        returnHome: swapTravel,
      });
    }, setIsLoading);

    return status;
  };

  const searchAddress = async (
    address: string,
    setAddressResult: (results: AddressResult) => void,
  ) => {
    let status = false;

    await loaderEffect(async () => {
      status = await searchLocationFromAddress(
        getRequestRoot(),
        address,
        (locations: LocationAddress[]) => {
          setAddressResult({
            address: address,
            results: locations,
          });
        },
      );
    }, setIsLoading);

    return status;
  };

  return (
    <ScheduleTravel.Provider
      value={{
        searchAddress: searchAddress,
        scheduleTravel: scheduleTravel,
        currentSchedule: currentSchedule,
      }}
    >
      {children}
      {isLoading && (
        <FullScreenContainer>
          <CenterElementsLayouts>
            <SpinnerLoader />
          </CenterElementsLayouts>
        </FullScreenContainer>
      )}
    </ScheduleTravel.Provider>
  );
};

export const useScheduleTravel = () => {
  return useContext(ScheduleTravel);
};
