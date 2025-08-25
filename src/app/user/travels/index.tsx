import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import OptionButton from '@components/buttons/OptionButton.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useNavigate } from 'react-router-dom';
import { useUserManager } from '@/context/UserManager.tsx';
import { Navigate } from 'react-router';

function UserTravels() {
  const navigate = useNavigate();
  const { role } = useUserManager();
  const { theme } = useUserTheme();

  if (role === 'driver') {
    return (
      <div className={'flex flex-col'}>
        <TravelMessage
          title={'Aún no tienes viajes planificados.'}
          message={'Toca el botón para agendar un viaje.'}
        />

        <OptionButton
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
      <div className={'flex flex-col'}>
        <TravelMessage
          title={'Aún no tienes viajes en tu lista.'}
          message={'Toca el botón para buscar un viaje.'}
        />

        <OptionButton
          label={'Buscar'}
          theme={theme}
          onClick={async () => {
            navigate('schedule/');
          }}
        />
      </div>
    );
  } else {
    return <Navigate to={'/home'} replace />;
  }
}

export default UserTravels;
