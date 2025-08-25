import { Navigate } from 'react-router';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import OptionButton from '@components/buttons/OptionButton.tsx';

function RideTravel() {
  const { role } = useUserManager();
  const { theme } = useUserTheme();

  if (role !== 'passenger') {
    return <Navigate to={'/home/travels'} replace />;
  }

  return (
    <div className={'flex flex-col'}>
      <OptionButton label={'Agendar'} theme={theme} />
    </div>
  );
}

export default RideTravel;
