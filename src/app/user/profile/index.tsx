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
import UserRole from '$libs/types/UserRole.ts';

const roleOptions: UserRole[] = [
  'not-verified',
  'passenger',
  'driver',
  'staff',
  'admin',
];

const searchRoleFromList = (role: UserRole): number => {
  for (let i = 0; i < roleOptions.length; i++) {
    if (roleOptions[i] == role) {
      return i;
    }
  }

  return 0;
};

const selectThemeFromRole = (role: UserRole): ColorTheme => {
  if (role === 'driver') {
    return 'teal';
  } else if (role === 'passenger') {
    return 'indigo';
  }

  return 'gray';
};

function UserProfile() {
  const { logout, refreshRole, role } = useUserManager();
  const [loading, setLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState<number>(
    searchRoleFromList(role),
  );
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(
    selectThemeFromRole(role),
  );
  const [currentRole, setCurrentRole] = useState<UserRole>(role);

  const options: StringOption[] = [
    {
      id: 0,
      description: 'No verificado',
    },
    {
      id: 1,
      description: 'Pasajero',
    },
    {
      id: 2,
      description: 'Conductor',
    },
    {
      id: 3,
      description: 'Staff',
    },
    {
      id: 4,
      description: 'Administrador',
    },
  ];

  useEffect(() => {
    setCurrentTheme(selectThemeFromRole(currentRole));
    setCurrentOption(searchRoleFromList(currentRole));
  }, [currentRole]);

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
        defaultValue={currentOption}
        options={options}
        onSelect={async function (index: number) {
          await loaderEffect(async () => {
            const currentRoleOption = roleOptions[index];
            console.log(`Role selected: ${index} ${currentRoleOption}`);

            const status = await refreshRole(currentRoleOption);

            if (status) {
              setCurrentRole(currentRoleOption);
              setCurrentTheme(selectThemeFromRole(currentRoleOption));
              setCurrentOption(index);
            }
          }, setLoading);
        }}
      />
    </MainLayout>
  );
}

export default UserProfile;
