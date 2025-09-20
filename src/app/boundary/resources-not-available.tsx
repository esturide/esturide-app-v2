import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';

function ResourcesNotAvailable() {
  return (
    <MainLayout>
      <SorryMessage
        message={'Este apartado no se encuentra disponible.'}
        title={'Próximamente'}
        shadow
        dark
      />
    </MainLayout>
  );
}
export default ResourcesNotAvailable;
