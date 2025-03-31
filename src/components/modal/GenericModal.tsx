import React, { PropsWithChildren, useRef } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';

type Props = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

const GenericModal: React.FC<PropsWithChildren<Props>> = ({
  children,
  isOpen,
  setOpen,
}) => {
  const ref = useRef<SheetRef>(null);

  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[600, 400, 100, 0]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
            <Sheet.Scroller draggableAt="both">{children}</Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default GenericModal;
