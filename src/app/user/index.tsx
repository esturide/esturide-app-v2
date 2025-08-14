import SorryMessage from '@components/resources/SorryMessage.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';

function UserHome() {
  return (
    <>
      <SorryMessage
        message={
          'Estamos trabajando en esta funcionalidad para ofrecerte una mejor experiencia.'
        }
        title={'Próximamente'}
      />
      <SpinnerLoader />
    </>
  );
}

export default UserHome;
