import { useUserManager } from '@/context/UserManager.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import TouchableOption from '@components/buttons/TouchableOption.tsx';
import { FaArrowRight } from 'react-icons/fa';
import ToggleInputList from '@components/input/list/ToggleInputList.tsx';
import SelectOptions, {
  StringOption,
} from '@components/input/selector/SelectOptions.tsx';

function UserProfile() {
  const { logout } = useUserManager();

  const options: StringOption[] = [
    {
      id: 0,
      description: 'Pasajero',
    },
    {
      id: 1,
      description: 'Condcutor',
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
