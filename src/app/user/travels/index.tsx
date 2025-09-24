import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import { useTravelManagementContext } from '@/context/TravelManagementContext.tsx';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import MediumButton from '@components/buttons/MediumButton.tsx';
import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { failureMessage } from '$libs/toast/failure.ts';

function UserTravels() {
  const navigate = useNavigate();

  const { role, refreshRole } = useUserManager();
  const { theme } = useUserTheme();
  const { restoreCurrentTravel } = useTravelManagementContext();

  useEffect(() => {
    const requestCurrentTravel = async () => {
      const status = await restoreCurrentTravel();

      if (status) {
        if (role !== 'driver') {
          failureMessage('Tienes un viaje pendiente.');

          await refreshRole('driver');
        }
        navigate('/home/travels/schedule/current');
      }
    };

    requestCurrentTravel();
  }, []);

  const ViewDriver = () => {
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
            navigate('ride/');
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
