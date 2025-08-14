import SorryMessage from '@components/resources/SorryMessage.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import UserButton from '@components/buttons/UserButton.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';

function UserProfile() {
  const { logout } = useUserManager();
  const { theme } = useUserTheme();

  return (
    <>
      <MainLayout>
        <UserButton
          label={'Cerrar sesion'}
          theme={theme}
          onClick={async () => {
            await logout();
          }}
        />
      </MainLayout>
    </>
  );
}

export default UserProfile;
