import { useUserManager } from '@/context/UserManager.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import TouchableOption from '@components/buttons/TouchableOption.tsx';
import { FaArrowRight } from 'react-icons/fa';
import SelectOptions, {
  StringOption,
} from '@components/input/selector/SelectOptions.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import { useEffect } from 'react';

function UserProfile() {
  const { logout } = useUserManager();
  const { size } = useDeviceManagement();

  useEffect(() => {
    console.log(size);
  }, [size]);

  const options: StringOption[] = [
    {
      id: 0,
      description: 'Pasajero',
    },
    {
      id: 1,
      description: 'Conductor',
    },
  ];

  return (
    <>
      <MainLayout>
        <div className={'flex flex-col items-center justify-center'}>
          <TouchableOption label={'Cambiar role'} icon={FaArrowRight} />
          <TouchableOption
            label={'Cerrar sesion'}
            icon={FaArrowRight}
            onClick={async () => {
              await logout();
            }}
          />
        </div>

        <SelectOptions
          options={options}
          onSelect={async function (index: number) {}}
        />
      </MainLayout>
    </>
  );
}

export default UserProfile;
