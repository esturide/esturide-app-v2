import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';

function ResourcesNotAvailable() {
  return (
    <MainResponsiveLayout>
      <SorryMessage
        message={'Este apartado no se encuentra disponible.'}
        title={'Próximamente'}
        shadow
        dark
      />
    </MainResponsiveLayout>
  );
}
export default ResourcesNotAvailable;
