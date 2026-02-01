import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';

function UserNotify() {
  return (
    <MainResponsiveLayout>
      <SorryMessage
        message={
          'Estamos trabajando en esta funcionalidad para ofrecerte una mejor experiencia.'
        }
        title={'Próximamente'}
      />
    </MainResponsiveLayout>
  );
}

export default UserNotify;
