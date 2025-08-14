import React from 'react';
import '@styles/button/Button.scss';
import ColorTheme from '$libs/types/theme.ts';

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
  if (theme === 'teal') {
    return (
      <button
        className={
          'overflow-hidden gap-2.5 self-stretch px-11 py-4 text-base font-bold text-white bg-teal-700 rounded-b-xl rounded-tl-xl w-full transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
        }
        onClick={onClick}
      >
        {label}
      </button>
    );
  } else if (theme === 'indigo') {
    return (
      <button
        className={
          'overflow-hidden gap-2.5 self-stretch px-11 py-4 text-base font-bold text-white bg-indigo-700 rounded-b-xl rounded-tl-xl w-full transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
        }
        onClick={onClick}
      >
        {label}
      </button>
    );
  } else {
    return (
      <button
        className={
          'overflow-hidden gap-2.5 self-stretch px-11 py-4 text-base font-bold text-white bg-gray-700 rounded-b-xl rounded-tl-xl w-full transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
        }
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
};

export default UserButton;
