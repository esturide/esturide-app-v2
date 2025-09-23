import React, {
  createContext,
  PropsWithChildren,
  useContext,
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

export interface LocationAddressParams {
  readonly addressFrom: string;
  readonly addressTo: string;
}

interface TravelManagementProps {
  scheduleTravel: (state: ScheduleState) => Promise<boolean>;
  searchAddress: (
    address: string,
    setResults: (results: LocationAddress[]) => void,
  ) => Promise<boolean>;
  currentSchedule?: ScheduleTravelData;
  restoreCurrentTravel: () => Promise<boolean>;
}

const currentScheduleDataAtom = atom<ScheduleTravelData | undefined>(undefined);

const ScheduleTravel = createContext<TravelManagementProps>({
  scheduleTravel: async () => {
    return false;
  },
  searchAddress: async () => {
    return false;
  },
  restoreCurrentTravel: async () => {
    return false;
  },
});

export const TravelManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const [currentSchedule, setCurrentSchedule] = useAtom(
    currentScheduleDataAtom,
  );

  const restoreCurrentTravel = async () => {
    let status = false;

    await loaderEffect(async () => {
      status = await requestCurrentScheduleTravel(
        getRequestRoot(),
        setCurrentSchedule,
      );
    }, setLoading);

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
        restoreCurrentTravel: restoreCurrentTravel,
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

export const useTravelManagementContext = () => {
  return useContext(ScheduleTravel);
};
