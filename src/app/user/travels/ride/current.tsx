import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';
import WeightLayout from '@layouts/WeightLayout.tsx';
import { useSocket } from '@/context/SocketManagerContext.tsx';
import { useEffect } from 'react';

function CurrentRide() {
  const { watchPosition } = useWatchLivePositionContext();
  const { connected, sendMessage, messages } = useSocket();

  useEffect(() => {
    if (connected) {
      console.log("It's connected");
    } else {
      console.error('Error connection.');
    }
  }, [connected]);

  return (
    <MainResponsiveLayout>
      <WeightLayout>
        <p>Current page</p>
      </WeightLayout>
    </MainResponsiveLayout>
  );
}

export default CurrentRide;
