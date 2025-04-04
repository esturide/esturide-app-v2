import React from 'react';
import '@styles/button/Button.scss';

type Props = {
  label: string;
  onClick?: () => Promise<void>;
};

const Button: React.FC<Props> = ({ label, onClick = async () => {} }) => {
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
};

export default Button;
