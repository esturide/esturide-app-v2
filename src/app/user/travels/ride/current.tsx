import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import RideData from '$libs/types/data/RideData.ts';
import UserData from '$libs/types/data/UserData.ts';
import PassengerCard from '@components/cards/resources/PassengerCard.tsx';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';

function CurrentRide() {
  const { watchPosition } = useWatchLivePositionContext();
  const user: UserData = {
    code: 0,
    firstName: 'Diego Sealtiel',
    paternalSurname: 'Valderrama',
    maternalSurname: 'Garcia',
    position: watchPosition,
  };

  const ride: RideData = {
    accept: true,
    cancel: true,
    over: false,
    passenger: user,
    seat: 'A',
    uuid: '',
  };

  return (
    <MainResponsiveLayout>
      <div className={'flex flex-col gap-4'}>
        <PassengerCard user={user} showMap />
        <PassengerCard user={user} showMap />
      </div>
    </MainResponsiveLayout>
  );
}

export default CurrentRide;
