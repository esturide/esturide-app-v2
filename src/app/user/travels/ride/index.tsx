import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import MediumButton from '@components/buttons/MediumButton.tsx';
import ScheduleTravelCard from '@components/cards/resources/ScheduleTravelCard.tsx';
import UserData from '$libs/types/data/UserData.ts';
import RideData from '$libs/types/data/RideData.ts';
import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';
import ScheduleTravelData from '$libs/types/data/ScheduleTravelData.ts';

function RequestRideTravel() {
  const navigate = useNavigate();

  const { role } = useUserManager();
  const { theme } = useUserTheme();
  const { watchPosition } = useWatchLivePositionContext();

  const user: UserData = {
    code: 0,
    firstName: 'Diego Sealtiel',
    paternalSurname: 'Valderrama',
    maternalSurname: 'Garcia',
    position: watchPosition,
  };

  const schedule: ScheduleTravelData = {
    uuid: '',
    driver: user,
    price: 1,
    terminate: false,
    cancel: false,
    maxPassengers: 3,
    seats: ['C'],
    origin: {
      longitude: 0,
      latitude: 0,
      address: 'CUCEI',
    },
    destination: {
      longitude: 0,
      latitude: 0,
      address: 'CUCEI',
    },
    rides: [],
    genderFilter: [],
  };

  if (role !== 'passenger') {
    return <Navigate to={'/home/travels'} replace />;
  }

  const onSearch = async () => {
    navigate('/home/travels/ride/current');
  };

  return (
    <MainResponsiveLayout>
      <div className={'flex flex-col gap-4 h-screen'}>
        <div className={''}>
          <ScheduleTravelCard schedule={schedule} showMap />
        </div>

        <div className={'flex flex-row gap-2'}>
          <MediumButton label={'Buscar'} theme={theme} onClick={onSearch} />
          <MediumButton label={'Filtrar'} theme={theme} onClick={onSearch} />
        </div>
      </div>
    </MainResponsiveLayout>
  );
}

export default RequestRideTravel;
