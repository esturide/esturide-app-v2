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
import LocationAddress from '$libs/types/LocationAddress.ts';
import loaderEffect from '$libs/loaderEffect.ts';
import ScheduleTravelData from '$libs/request/response/ScheduleTravelData.ts';
import { atom, useAtom } from 'jotai';

interface ScheduleTravelProps {
  scheduleTravel: (state: ScheduleState) => Promise<boolean>;
  searchAddress: (
    address: string,
    setResults: (results: LocationAddress[]) => void,
  ) => Promise<boolean>;
  currentSchedule?: ScheduleTravelData;
}

const currentScheduleDataAtom = atom<ScheduleTravelData | undefined>(undefined);

const ScheduleTravel = createContext<ScheduleTravelProps>({
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
  const [loading, setLoading] = useState(false);

  const [currentSchedule, setCurrentSchedule] = useAtom(
    currentScheduleDataAtom,
  );

  useEffect(() => {
    restoreCurrentTravel();
  }, []);

  const restoreCurrentTravel = async () => {
    let status = false;

    status = await requestCurrentScheduleTravel(
      getRequestRoot(),
      setCurrentSchedule,
    );

    return status;
  };

  const scheduleTravel = async (schedule: ScheduleState) => {
    let status = false;

    await loaderEffect(async () => {
      status = await requestScheduleTravel(getRequestRoot(), schedule);
    }, setLoading);

    return status;
  };

  const searchAddress = async (
    address: string,
    setAddressResult: (results: LocationAddress[]) => void,
  ) => {
    let status = false;

    await loaderEffect(async () => {
      status = await searchLocationFromAddress(
        getRequestRoot(),
        address,
        setAddressResult,
      );
    }, setLoading);

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
      {loading && (
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
