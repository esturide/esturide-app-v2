import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import RideInterface from '$libs/types/interface/RideInterface.ts';
import UserInterface from '$libs/types/interface/UserInterface.ts';
import PassengerCard from '@components/cards/resources/PassengerCard.tsx';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';

function CurrentRide() {
  const { watchPosition } = useWatchLivePositionContext();
  const user: UserInterface = {
    code: 0,
    firstName: 'Diego Sealtiel',
    paternalSurname: 'Valderrama',
    maternalSurname: 'Garcia',
    position: watchPosition,
  };

  const ride: RideInterface = {
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
