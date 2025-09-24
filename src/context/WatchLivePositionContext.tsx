import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { atom, useAtom } from 'jotai';
import Location from '$libs/types/Location.ts';

const currentWatchPositionAtom = atom<Location>({ latitude: 0, longitude: 0 });
const stopWatchPositionAtom = atom<boolean>(false);

interface Props {
  watchPosition: Location;
  availableWatchPosition: boolean;
  onStopWatchPosition: (state: boolean) => void;
}

const WatchLivePosition = createContext<Props>({
  watchPosition: {
    latitude: 0,
    longitude: 0,
  },
  onStopWatchPosition: () => {},
  availableWatchPosition: false,
});

export const WatchLivePositionProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [hidePosition, setHidePosition] = useState(false);
  const [watchPosition, setWatchPosition] = useAtom(currentWatchPositionAtom);
  const [availableWatchPosition, setAvailableWatchPosition] = useAtom(
    stopWatchPositionAtom,
  );

  useEffect(() => {
    if (navigator.geolocation) {
      setAvailableWatchPosition(true);

      const watchId = navigator.geolocation.watchPosition(
        async pos => {
          if (!hidePosition) {
            setWatchPosition({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          }
        },
        err => {
          console.error('Error getting location:', err);
          setAvailableWatchPosition(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const onStopWatchPosition = (state: boolean) => {
    setHidePosition(state);
  };

  return (
    <WatchLivePosition.Provider
      value={{
        watchPosition: watchPosition,
        onStopWatchPosition: onStopWatchPosition,
        availableWatchPosition: availableWatchPosition,
      }}
    >
      {children}
    </WatchLivePosition.Provider>
  );
};

export const useWatchLivePositionContext = () => {
  return useContext(WatchLivePosition);
};
