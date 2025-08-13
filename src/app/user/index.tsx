import SorryMessage from '@components/resources/SorryMessage.tsx';

function UserHome() {
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
