import React, { useId } from 'react';
import { IoMdClose } from 'react-icons/io';
import StyleTheme from '$libs/types/Style.ts';

type Props = {
  onClose?: () => void;
  title?: string;
  closable?: boolean;
  style?: StyleTheme;
};

const SimpleFloatingDialog = ({
  children,
  onClose,
  title,
  closable = false,
  style = 'solid',
}: React.PropsWithChildren<Props>) => {
  const id = useId();

  const styleThemes = {
    glass:
      'flex flex-col gap-2 p-4 sm:px-6 sm:py-4 rounded-lg bg-white/70 backdrop-blur-md shadow-lg inset-shadow-sm/50',
    solid:
      'flex flex-col gap-2 p-4 sm:px-6 sm:py-4 rounded-lg bg-white shadow-lg inset-shadow-sm',
  };

  return (
    <div
      id={id}
      className="fixed inset-0 left-1/2 top-11/14 sm:top-10/12 transform -translate-x-1/2 -translate-y-1/2 p-3 z-40 w-full max-w-md"
    >
      <div className={styleThemes[style]}>
        <div className="flex flex-row justify-between">
          {title && (
            <h2 className="text-center text-lg font-light text-gray-700">
              {title}
            </h2>
          )}
          {closable && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoMdClose />
            </button>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SimpleFloatingDialog;
