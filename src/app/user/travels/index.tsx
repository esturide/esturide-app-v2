import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import MediumButton from '@components/buttons/MediumButton.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useNavigate } from 'react-router-dom';
import { useUserManager } from '@/context/UserManager.tsx';
import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';

function UserTravels() {
  const navigate = useNavigate();
  const { role } = useUserManager();
  const { theme } = useUserTheme();

  const InvalidRole = () => {
    return (
      <SorryMessage
        message={'Esta seccion no esta disponible para tu rol actual.'}
        title={'Próximamente'}
      />
    );
  };

  const ViewRole = () => {
    if (role === 'driver') {
      return (
        <div className={'flex flex-col gap-8'}>
          <TravelMessage
            title={'Aún no tienes viajes planificados.'}
            message={'Toca el botón para agendar un viaje.'}
          />

          <MediumButton
            label={'Agendar'}
            theme={theme}
            onClick={async () => {
              navigate('schedule/');
            }}
          />
        </div>
      );
    } else if (role === 'passenger') {
      return (
        <div className={'flex flex-col gap-8'}>
          <TravelMessage
            title={'Aún no tienes viajes en tu lista.'}
            message={'Toca el botón para buscar un viaje.'}
          />

          <MediumButton
            label={'Buscar'}
            theme={theme}
            onClick={async () => {
              navigate('schedule/');
            }}
          />
        </div>
      );
    } else {
      return <InvalidRole />;
    }
  };

  return (
    <MainLayout>
      <ViewRole />
    </MainLayout>
  );
}

export default UserTravels;
