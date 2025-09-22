import { Navigate } from 'react-router';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import MediumButton from '@components/buttons/MediumButton.tsx';

function RideTravel() {
  const { role } = useUserManager();
  const { theme } = useUserTheme();

  if (role !== 'passenger') {
    return <Navigate to={'/home/travels'} replace />;
  }

  return (
    <div className={'flex flex-col'}>
      <MediumButton label={'Agendar'} theme={theme} />
    </div>
  );
}

export default RideTravel;
