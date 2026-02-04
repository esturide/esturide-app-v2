import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { requestRideTravel } from '$libs/request/ride.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';

export interface RideLocationAddressParams {
  readonly addressFrom: string;
  readonly addressTo: string;
  readonly exitingTime: Date;
}

type Props = {
  requestRide: (origin: string, destination: string, exiting: Date) => Promise<boolean>
};

const RideTravel = createContext<Props>({
  requestRide: async () => false,
});

export const RideTravelManagementProvider: React.FC<PropsWithChildren> = ({children}) => {
  const { watchPosition } = useWatchLivePositionContext();

  useEffect(() => {
    console.log(`Current position: ${watchPosition}`);
  }, [watchPosition]);

  const requestRide = async (
    origin: string,
    destination: string,
    exiting: Date,
  ) => {
    return await requestRideTravel(getRequestRoot(), {
      origin: origin,
      destination: destination,
      exiting: exiting,
    });
  };

  return <RideTravel.Provider value={{
    requestRide: requestRide
  }}>{children}</RideTravel.Provider>;
};

export const useRideTravelManagementContext = () => {
  return useContext(RideTravel);
};
