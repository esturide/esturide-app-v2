import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { atom, useAtom } from 'jotai';
import { searchLocationFromAddress } from '$libs/request/search.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import {
  requestCurrentScheduleTravel,
  requestScheduleTravel,
  ScheduleOption,
  updateCurrentSchedule,
} from '$libs/request/schedule.ts';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';
import ScheduleRequest from '$libs/request/request/ScheduleRequest.ts';
import LocationAddress from '$libs/types/LocationAddress.ts';
import ScheduleTravelData from '$libs/types/data/ScheduleTravelData.ts';
import { recordCurrentLocation } from '$libs/request/record.ts';

export interface LocationAddressParams {
  readonly addressFrom: string;
  readonly addressTo: string;
}

interface Props {
  scheduleTravel: (state: ScheduleRequest) => Promise<boolean>;
  searchAddress: (
    address: string,
    setResults: (results: LocationAddress[]) => void,
  ) => Promise<boolean>;
  currentSchedule?: ScheduleTravelData;
  restoreCurrentTravel: () => Promise<boolean>;
  updateCurrentScheduleTravel: (options: ScheduleOption) => Promise<boolean>;
}

const currentScheduleDataAtom = atom<ScheduleTravelData | undefined>(undefined);

const ScheduleTravel = createContext<Props>({
  scheduleTravel: async () => {
    return false;
  },
  searchAddress: async () => {
    return false;
  },
  restoreCurrentTravel: async () => {
    return false;
  },
  updateCurrentScheduleTravel: async () => {
    return false;
  },
});

export const TravelManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { watchPosition } = useWatchLivePositionContext();

  const [currentSchedule, setCurrentSchedule] = useAtom(
    currentScheduleDataAtom,
  );

  useEffect(() => {
    const request = async () => {
      if (currentSchedule) {
        await recordCurrentLocation(getRequestRoot(), watchPosition);
      }
    };

    request();
  }, [watchPosition]);

  const restoreCurrentTravel = async () => {
    let status = false;

    status = await requestCurrentScheduleTravel(
      getRequestRoot(),
      setCurrentSchedule,
    );

    if (!status) {
      setCurrentSchedule(undefined);
    }

    return status;
  };

  const updateCurrentScheduleTravel = async (options: ScheduleOption) => {
    const status = await updateCurrentSchedule(getRequestRoot(), options);

    if (status) {
      await restoreCurrentTravel();
    }
    return status;
  };

  const scheduleTravel = async (schedule: ScheduleRequest) => {
    let status = false;

    status = await requestScheduleTravel(getRequestRoot(), schedule);

    return status;
  };

  const searchAddress = async (
    address: string,
    setAddressResult: (results: LocationAddress[]) => void,
  ) => {
    let status = false;

    status = await searchLocationFromAddress(
      getRequestRoot(),
      address,
      setAddressResult,
    );

    return status;
  };

  return (
    <ScheduleTravel.Provider
      value={{
        searchAddress: searchAddress,
        scheduleTravel: scheduleTravel,
        currentSchedule: currentSchedule,
        restoreCurrentTravel: restoreCurrentTravel,
        updateCurrentScheduleTravel: updateCurrentScheduleTravel,
      }}
    >
      {children}
    </ScheduleTravel.Provider>
  );
};

export const useTravelManagementContext = () => {
  return useContext(ScheduleTravel);
};
