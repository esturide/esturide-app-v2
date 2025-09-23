import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import MediumButton from '@components/buttons/MediumButton.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useNavigate } from 'react-router-dom';
import { useUserManager } from '@/context/UserManager.tsx';
import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { useEffect } from 'react';
import { useTravelManagementContext } from '@/context/TravelManagementContext.tsx';

function UserTravels() {
  const navigate = useNavigate();
  const { role } = useUserManager();
  const { theme } = useUserTheme();

  const ViewDriver = () => {
    const { restoreCurrentTravel } = useTravelManagementContext();

    useEffect(() => {
      const requestCurrentTravel = async () => {
        const status = await restoreCurrentTravel();

        if (status) {
          navigate('/home/travels/schedule/current');
        }
      };

      requestCurrentTravel();
    }, []);

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
  };

  const ViewPassenger = () => {
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
  };

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
      return <ViewDriver />;
    } else if (role === 'passenger') {
      return <ViewPassenger />;
    } else {
      return <InvalidRole />;
    }
  };

  return (
    <MainResponsiveLayout>
      <ViewRole />
    </MainResponsiveLayout>
  );
}

export default UserTravels;
