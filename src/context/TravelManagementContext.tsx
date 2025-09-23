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
  restoreCurrentTravel: (loader?: boolean) => Promise<boolean>;
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
  watchPosition: {
    longitude: 0,
    latitude: 0,
  },
});

export const TravelManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

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

          await recordCurrentLocation(getRequestRoot(), {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        err => {
          console.error('Error getting location:', err);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const restoreCurrentTravel = async (loader: boolean = false) => {
    let status = false;

    if (loader) {
      await loaderEffect(async () => {
        status = await requestCurrentScheduleTravel(
          getRequestRoot(),
          setCurrentSchedule,
        );
      }, setLoading);
    } else {
      status = await requestCurrentScheduleTravel(
        getRequestRoot(),
        setCurrentSchedule,
      );
    }

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
        watchPosition: watchPosition,
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
