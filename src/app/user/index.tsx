import SorryMessage from '@components/resources/SorryMessage.tsx';
import SeatSelectorInput from '@components/input/car/SeatSelectorInput.tsx';
import GenericModal from '@components/modal/GenericModal.tsx';
import { useState } from 'react';
import GlassButton from '@components/experimental/GlassButton.tsx';

function UserHome() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SorryMessage
        message={
          'Estamos trabajando en esta funcionalidad para ofrecerte una mejor experiencia.'
        }
        title={'Próximamente'}
      />

      <GlassButton
        label={'Mostrar modal'}
        onClick={async () => {
          setShowModal(!showModal);
          console.log(showModal);
        }}
      />

      <GenericModal
        isOpen={showModal}
        setOpen={function (isOpen: boolean): void {
          setShowModal(!isOpen);
        }}
      >
        <SeatSelectorInput />
      </GenericModal>
    </>
  );
}

export default UserHome;
