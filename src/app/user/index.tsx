import SorryMessage from '@components/resources/SorryMessage.tsx';
import addNotification from 'react-push-notification';
import UserButton from '@components/buttons/UserButton.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import { toast } from 'react-toastify';

function UserHome() {
  const onShowNotify = async () => {
    addNotification({
      title: 'Warning',
      subtitle: 'This is a subtitle',
      message: 'This is a very long message',
      native: true,
    });
  };

  const onShowToast = async () => {
    toast('Wow so easy!');
  };

  return (
    <>
      <SorryMessage
        message={
          'Estamos trabajando en esta funcionalidad para ofrecerte una mejor experiencia.'
        }
        title={'Próximamente'}
      />

      <MainLayout>
        <div className={'flex flex-col gap-2 w-full'}>
          <UserButton onClick={onShowNotify} label={'Notificacion'} />
          <UserButton onClick={onShowToast} label={'Toast'} />
        </div>
      </MainLayout>
    </>
  );
}

export default UserHome;
