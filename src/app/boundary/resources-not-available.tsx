import SorryMessage from '@components/resources/SorryMessage.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';

function ResourcesNotAvailable() {
  return (
    <div className={'pt-auto h-screen max-md:overflow-y-scroll'}>
      <MainResponsiveLayout>
        <SorryMessage
          message={'Este apartado no se encuentra disponible.'}
          title={'Próximamente'}
          shadow
          background
        />
      </MainResponsiveLayout>
    </div>
  );
}
export default ResourcesNotAvailable;
