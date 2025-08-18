import React from 'react';
import '@styles/button/Button.scss';
import ColorTheme from '$libs/types/Theme.ts';

type Props = {
  label: string;
  onClick?: () => Promise<void>;
  theme?: ColorTheme;
  type?: 'round' | 'semi-round';
};

const UserButton: React.FC<Props> = ({
  label,
  onClick = async () => {},
  theme = 'teal',
}) => {
  const allThemes = {
    gray: 'overflow-hidden gap-2.5 self-stretch px-11 py-4 text-base font-bold text-white bg-gray-700 rounded-b-xl rounded-tl-xl w-full transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    teal: 'overflow-hidden gap-2.5 self-stretch px-11 py-4 text-base font-bold text-white bg-teal-600 rounded-b-xl rounded-tl-xl w-full transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    indigo:
      'overflow-hidden gap-2.5 self-stretch px-11 py-4 text-base font-bold text-white bg-indigo-700 rounded-b-xl rounded-tl-xl w-full transition-colors hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-',
  };

  return (
    <button className={allThemes[theme]} onClick={onClick}>
      {label}
    </button>
  );
};

export default UserButton;
