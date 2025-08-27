import React, { useEffect, useRef } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';

type Props = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onOpen?: () => Promise<void>;
  onClose?: () => Promise<void>;
};

const ModalSheet = ({
  children,
  isOpen,
  setOpen,
  onOpen = async () => {},
  onClose = async () => {},
}: React.PropsWithChildren<Props>) => {
  const ref = useRef<SheetRef>(null);

  useEffect(() => {
    const event = async () => {
      if (isOpen) {
        await onOpen();
      } else {
        await onClose();
      }
    };

    event();
  }, [isOpen]);

  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} initialSnap={1}>
        <Sheet.Container>
          <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
            <Sheet.Header />
            <Sheet.Scroller draggableAt="top">
              <div
                className={
                  'flex flex-col overflow-auto scroll-auto h-full mx-auto max-w-7xl px-6 lg:px-18'
                }
              >
                {children}
              </div>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default ModalSheet;
