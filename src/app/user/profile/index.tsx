import { useUserManager } from '@/context/UserManager.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import SelectOptions, {
  StringOption,
} from '@components/input/selector/SelectOptions.tsx';
import UserButton from '@components/buttons/UserButton.tsx';
import React, { useEffect, useState } from 'react';
import ColorTheme from '$libs/types/Theme.ts';
import loaderEffect from '$libs/loaderEffect.ts';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import FullscreenContainer from '@components/resources/FullscreenContainer.tsx';
import UserRole from '$libs/types/UserRole.ts';
import OptionButton from '@components/buttons/OptionButton.tsx';

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

  const onSelectRole = async (index: number) => {
    await loaderEffect(async () => {
      const selectRoleOption = roleOptions[index];

      if (selectRoleOption != role) {
        const status = await refreshRole(selectRoleOption);

        if (status) {
          setCurrentRole(selectRoleOption);
          setCurrentTheme(selectThemeFromRole(selectRoleOption));
          setCurrentOption(index);
        }
      }
    }, setLoading);
  };

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
        <UserButton
          label={'Cerrar sesion'}
          theme={currentTheme}
          onClick={async () => {
            await logout();
          }}
        />

        <OptionButton
          label={'Cerrar sesion'}
          theme={currentTheme}
          onClick={async () => {
            await logout();
          }}
          disabled
        />
      </div>

      <SelectOptions
        theme={currentTheme}
        defaultValue={currentOption}
        onSelect={onSelectRole}
        options={[
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
        ]}
      />
    </MainLayout>
  );
}

export default UserProfile;
