import SorryMessage from '@components/resources/SorryMessage.tsx';
import addNotification from 'react-push-notification';
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
    </>
  );
}

export default UserHome;
