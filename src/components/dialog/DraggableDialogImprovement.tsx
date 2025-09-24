import Draggable from 'react-draggable';
import React, { useRef } from 'react';
import StyleTheme from '$libs/types/Style.ts';
import { IoMdClose } from 'react-icons/io';

type Props = {
  title?: string;
  onClose?: () => void;
  closable?: boolean;
  style?: StyleTheme;
};

function DraggableDialogImprovement({
  children,
  title,
  onClose,
  closable,
  style = 'solid',
}: React.PropsWithChildren<Props>) {
  const nodeRef = useRef(null);

  const styleThemes = {
    glass:
      'card w-sm absolute bg-white shadow-lg rounded-lg z-50 hover:bg-white/50 flex flex-col p-4 sm:px-6 sm:py-4 rounded-b-lg bg-white/70 backdrop-blur-md shadow-lg inset-shadow-sm/50',
    solid:
      'card w-sm absolute bg-white shadow-lg rounded-lg z-50 flex flex-col p-4 sm:px-6 sm:py-4 rounded-b-lg bg-white shadow-lg inset-shadow-sm',
  };

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className={styleThemes[style]}>
        <div className="flex flex-row justify-between cursor-grab">
          {title && (
            <h2 className="text-center text-lg font-light text-gray-700 mb-2">
              {title}
            </h2>
          )}
          {closable && (
            <button
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoMdClose />
            </button>
          )}
        </div>
        {children}
      </div>
    </Draggable>
  );
}

export default DraggableDialogImprovement;
