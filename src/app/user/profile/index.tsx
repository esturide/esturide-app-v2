import { useUserManager } from '@/context/UserManager.tsx';
import SelectOptions from '@components/input/selector/SelectOptions.tsx';
import UserButton from '@components/buttons/UserButton.tsx';
import React, { useEffect, useState } from 'react';
import ColorTheme from '$libs/types/Theme.ts';
import loaderEffect from '$libs/loaderEffect.ts';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import FullscreenContainer from '@components/resources/FullscreenContainer.tsx';
import UserRole from '$libs/types/UserRole.ts';
import error from '$libs/toast/error.ts';
import selectThemeFromRole from '$libs/select/color.ts';
import { useUserTheme } from '@/context/UserTheme.tsx';

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

function UserProfile() {
  const { setTheme } = useUserTheme();
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
          const roleOption = selectRoleOption;
          const theme = selectThemeFromRole(roleOption);

          setCurrentTheme(theme);
          setTheme(theme);
          setCurrentRole(roleOption);
          setCurrentOption(index);
        } else {
          await error('Permisos invalidos.');
        }
      }
    }, setLoading);
  };

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
    <>
      <div
        className={'flex flex-col items-center justify-center  w-full gap-2'}
      >
        <UserButton
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
    </>
  );
}

export default UserProfile;
