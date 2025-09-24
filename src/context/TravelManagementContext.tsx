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
import ScheduleState from '$libs/request/response/ScheduleState.ts';
import LocationAddress from '$libs/types/LocationAddress.ts';
import ScheduleTravelData from '$libs/request/response/ScheduleTravelData.ts';
import { recordCurrentLocation } from '$libs/request/record.ts';
import Location from '$libs/types/Location.ts';

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
  updateCurrentScheduleTravel: (options: ScheduleOption) => Promise<boolean>;
  watchPosition: Location;
}

const currentScheduleDataAtom = atom<ScheduleTravelData | undefined>(undefined);
const currentWatchPositionAtom = atom<Location>({ latitude: 0, longitude: 0 });

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
  updateCurrentScheduleTravel: async () => {
    return false;
  },
  watchPosition: {
    longitude: 0,
    latitude: 0,
  },
});

export const TravelManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [watchPosition, setWatchPosition] = useAtom(currentWatchPositionAtom);
  const [currentSchedule, setCurrentSchedule] = useAtom(
    currentScheduleDataAtom,
  );

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        async pos => {
          setWatchPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });

          if (currentSchedule) {
            await recordCurrentLocation(getRequestRoot(), watchPosition);
          }
        },
        err => {
          console.error('Error getting location:', err);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

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

  const scheduleTravel = async (schedule: ScheduleState) => {
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
        watchPosition: watchPosition,
      }}
    >
      {children}
    </ScheduleTravel.Provider>
  );
};

export const useTravelManagementContext = () => {
  return useContext(ScheduleTravel);
};
