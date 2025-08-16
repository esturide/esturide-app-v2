import { useUserManager } from '@/context/UserManager.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import TouchableOption from '@components/buttons/TouchableOption.tsx';
import { FaArrowRight } from 'react-icons/fa';

function UserProfile() {
  const { logout } = useUserManager();

  return (
    <>
      <MainLayout>
        <div>
          <TouchableOption label={'Cambiar role'} icon={FaArrowRight} />
          <TouchableOption
            label={'Cerrar sesion'}
            icon={FaArrowRight}
            onClick={async () => {
              await logout();
            }}
          />
        </div>
      </MainLayout>
    </>
  );
}

export default UserProfile;
