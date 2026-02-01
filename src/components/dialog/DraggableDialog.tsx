import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import StyleTheme from '$libs/types/Style.ts';

type Position = {
  x: number;
  y: number;
};

type Props = {
  onClose?: () => void;
  title?: string;
  closable?: boolean;
  style?: StyleTheme;
  defaultPosition?: Position;
};

/**
 * @deprecated Deprecated component, uses DraggableDialogImprovement.
 */
const DraggableDialog = ({
  children,
  onClose,
  title,
  closable = false,
  style = 'solid',
  defaultPosition = { x: 0, y: 0 },
}: React.PropsWithChildren<Props>) => {
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const dialogRef = useRef<HTMLDivElement>(null);

  const styleThemes = {
    glass:
      'w-sm absolute bg-white shadow-lg rounded-lg z-50 hover:bg-white/50 flex flex-col p-4 sm:px-6 sm:py-4 rounded-b-lg bg-white/70 backdrop-blur-md shadow-lg inset-shadow-sm/50',
    solid:
      'w-sm absolute bg-white shadow-lg rounded-lg z-50 flex flex-col p-4 sm:px-6 sm:py-4 rounded-b-lg bg-white shadow-lg inset-shadow-sm',
  };

  useEffect(() => {
    console.log(position);
  }, [position]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={dialogRef}
      className={styleThemes[style]}
      style={{ left: position.x, top: position.y }}
    >
      <div
        className={'flex justify-between items-center cursor-grab'}
        onMouseDown={e => {
          setIsDragging(true);

          if (dialogRef !== null) {
            if (dialogRef.current && e !== undefined) {
              const dialogRect = dialogRef.current.getBoundingClientRect();

              dragOffset.current = {
                x: e.clientX - dialogRect.left,
                y: e.clientY - dialogRect.top,
              };
            }
          }
        }}
      >
        <div className="flex flex-row justify-between">
          <h2 className="text-center text-lg font-light text-gray-700 mb-2">
            {title}
          </h2>

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
      </div>
      {children}
    </div>
  );
};

export default DraggableDialog;
