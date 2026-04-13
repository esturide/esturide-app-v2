import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import WeightLayout from '@layouts/WeightLayout.tsx';

function MatchRideTravel() {
  return (
    <MainResponsiveLayout>
      <WeightLayout>
        <p>Hello world from match page.</p>
      </WeightLayout>
    </MainResponsiveLayout>
  );
}

export default MatchRideTravel;
