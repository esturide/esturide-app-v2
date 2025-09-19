import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';

function UserHome() {
  return (
    <MainLayout>
      <SorryMessage
        message={
          'Estamos trabajando en esta funcionalidad para ofrecerte una mejor experiencia.'
        }
        title={'Próximamente'}
      />
    </MainLayout>
  );
}

export default UserHome;
