import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';
import WeightLayout from '@layouts/WeightLayout.tsx';

function CurrentRide() {
  const { watchPosition } = useWatchLivePositionContext();


  return (
    <MainResponsiveLayout>
      <WeightLayout>
        <p>Current page</p>
      </WeightLayout>
    </MainResponsiveLayout>
  );
}

export default CurrentRide;
