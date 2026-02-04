import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserTheme } from '@/context/UserTheme.tsx';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import MediumButton from '@components/buttons/MediumButton.tsx';
import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { useSessionManagementProvider } from '@/context/SessionManagementContext.tsx';
import { failureMessage } from '$libs/toast/failure.ts';
import useLazyEffect from '$libs/effects/lazyEffect.ts';
import PartialScreenContainer from '@layouts/container/PartialScreenContainer.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import { useUserManagerContext } from '@/context/UserManagementContext.tsx';
import {
  SocketManagerProvider,
  useSocket,
} from '@/context/SocketManagerContext.tsx';

function UserTravels() {
  const navigate = useNavigate();
  const { authToken } = useUserManagerContext();

  const { theme } = useUserTheme();

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
          label={'Empezar'}
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
    const { role, refreshRole } = useUserManagerContext();
    const { refreshCurrentSession } = useSessionManagementProvider();

    const { loading } = useLazyEffect(async () => {
      const userSession = await refreshCurrentSession();

      if (userSession === 'travel') {
        if (role !== 'driver') {
          failureMessage('You have a travel pending.');

          await refreshRole('driver');
        }

        navigate('/home/travels/schedule/current');
      } else if (userSession === 'ride') {
        if (role !== 'passenger') {
          failureMessage('You have a pending ride.');

          await refreshRole('passenger');
        }

        navigate('/home/travels/ride/current');
      }
    });

    if (loading) {
      return (
        <PartialScreenContainer>
          <SpinnerLoader />
        </PartialScreenContainer>
      );
    }

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
      <SocketManagerProvider
        namespace={'travel'}
        token={authToken}
        eventListener={['ping']}
      >
        <ViewRole />
      </SocketManagerProvider>
    </MainResponsiveLayout>
  );
}

export default UserTravels;
