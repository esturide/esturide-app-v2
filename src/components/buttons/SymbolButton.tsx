import React from 'react';
import {
  MdArrowBack,
  MdArrowForward,
  MdArrowLeft,
  MdArrowRight,
} from 'react-icons/md';
import ColorTheme from '$libs/types/Theme.ts';

type Props = {
  onClick?: () => Promise<void>;
  direction: 'forward' | 'backward' | 'left' | 'right';
  theme?: ColorTheme;
};

const SymbolButton: React.FC<Props> = ({
  direction,
  onClick = async () => {},
  theme = 'gray',
}) => {
  const directions = {
    forward: <MdArrowForward className="w-full h-full" color="white" />,
    backward: <MdArrowBack className="w-full h-full" color="white" />,
    left: <MdArrowLeft className="w-full h-full" color="white" />,
    right: <MdArrowRight className="w-full h-full" color="white" />,
  };

  const defaultDirection = directions[direction];

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="flex items-center justify-center w-11 h-[19px]  focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onClick}
      >
        {defaultDirection}
      </button>
    </div>
  );
};

export default SymbolButton;
