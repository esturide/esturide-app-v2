'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import OptionButton from '@components/buttons/OptionButton.tsx';

function RideTravel() {
  const router = useRouter();
  const { role } = useUserManager();
  const { theme } = useUserTheme();

  useEffect(() => {
    if (role !== 'passenger') {
      router.replace('/home/travels');
    }
  }, [role, router]);

  if (role !== 'passenger') return null;

  return (
    <div className={'flex flex-col'}>
      <OptionButton label={'Agendar'} theme={theme} />
    </div>
  );
}

export default RideTravel;
