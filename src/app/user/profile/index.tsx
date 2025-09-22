import { useUserManager } from '@/context/UserManager.tsx';
import SelectOptions from '@components/input/selector/SelectOptions.tsx';
import SquareButton from '@components/buttons/SquareButton.tsx';
import React, { useEffect, useState } from 'react';
import ColorTheme from '$libs/types/Theme.ts';
import loaderEffect from '$libs/loaderEffect.ts';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import UserRole from '$libs/types/UserRole.ts';
import {
  roleOptions,
  searchRoleFromList,
  selectThemeFromRole,
} from '$libs/select/color.ts';
import PartialScreenContainer from '@layouts/container/PartialScreenContainer.tsx';
import { failureMessage } from '$libs/toast/failure.ts';
import MainLayout from '@layouts/view/MainLayout.tsx';

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
          setCurrentOption(index);
        } else {
          failureMessage('Permisos invalidos.');
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
      <PartialScreenContainer>
        <SpinnerLoader />
      </PartialScreenContainer>
    );
  }

  return (
    <MainLayout>
      <div className={'flex flex-col items-center gap-2'}>
        <div
          className={'flex flex-col items-center justify-center w-full gap-2'}
        >
          <SquareButton
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
      </div>
    </MainLayout>
  );
}

export default UserProfile;
