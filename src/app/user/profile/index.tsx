import { useUserManager } from '@/context/UserManager.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import SelectOptions, {
  StringOption,
} from '@components/input/selector/SelectOptions.tsx';
import GenericButton from '@components/buttons/GenericButton.tsx';
import React, { useEffect, useState } from 'react';
import ColorTheme from '$libs/types/Theme.ts';
import loaderEffect from '$libs/loaderEffect.ts';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import FullscreenContainer from '@components/resources/FullscreenContainer.tsx';

function UserProfile() {
  const { logout, refreshRole, role } = useUserManager();
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('gray');

  useEffect(() => {
    if (role === 'driver') {
      setCurrentTheme('teal');
    } else if (role === 'passenger') {
      setCurrentTheme('indigo');
    } else {
      setCurrentTheme('gray');
    }
  }, [role]);

  const options: StringOption[] = [
    {
      id: 0,
      description: 'Pasajero',
    },
    {
      id: 1,
      description: 'Conductor',
    },
    {
      id: 2,
      description: 'Staff',
    },
    {
      id: 3,
      description: 'Administrador',
    },
  ];

  if (loading) {
    return (
      <FullscreenContainer>
        <SpinnerLoader />
      </FullscreenContainer>
    );
  }

  return (
    <MainLayout>
      <div
        className={
          'flex flex-col items-center justify-center h-full w-full gap-2'
        }
      >
        <GenericButton
          label={'Cerrar sesion'}
          theme={currentTheme}
          onClick={async () => {
            await logout();
          }}
        />
      </div>

      <SelectOptions
        theme={currentTheme}
        options={options}
        onSelect={async function (index: number) {
          await loaderEffect(async () => {
            if (index === 0) {
              await refreshRole('passenger');
            } else if (index == 1) {
              await refreshRole('driver');
            } else if (index == 2) {
              await refreshRole('admin');
            } else if (index == 3) {
              await refreshRole('passenger');
            } else if (index == 4) {
              await refreshRole('passenger');
            } else {
              await refreshRole('not-verified');
            }
          }, setLoading);
        }}
      />
    </MainLayout>
  );
}

export default UserProfile;
