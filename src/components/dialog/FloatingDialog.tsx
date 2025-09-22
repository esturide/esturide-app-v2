import React, { useEffect, useId, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import StyleTheme from '$libs/types/Style.ts';

type Props = {
  onClose?: () => void;
  title?: string;
  closable?: boolean;
  style?: StyleTheme;
};

const FloatingDialog = ({
  children,
  onClose,
  title,
  closable = false,
  style = 'solid',
}: React.PropsWithChildren<Props>) => {
  const id = useId();

  const styleThemes = {
    glass:
      'hover:bg-white/50 flex flex-col p-4 sm:px-6 sm:py-4 rounded-b-lg bg-white/70 backdrop-blur-md shadow-lg inset-shadow-sm/50',
    solid:
      'flex flex-col p-4 sm:px-6 sm:py-4 rounded-b-lg bg-white shadow-lg inset-shadow-sm',
  };

  return (
    <div id={id} className="absolute w-full">
      <div className={styleThemes[style]}>
        <div className="flex flex-row justify-between">
          {title && (
            <h2 className="text-center text-lg font-light text-gray-700 mb-2">
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

export default FloatingDialog;
