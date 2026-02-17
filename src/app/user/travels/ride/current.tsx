import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import WeightLayout from '@layouts/WeightLayout.tsx';

function CurrentRide() {
  return (
    <MainResponsiveLayout>
      <WeightLayout>
        <p>Current ride</p>
      </WeightLayout>
    </MainResponsiveLayout>
  );
}

export default CurrentRide;
