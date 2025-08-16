import SorryMessage from '@components/resources/SorryMessage.tsx';

function UserSettings() {
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

export default UserSettings;
