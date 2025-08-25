'use client';
import * as React from 'react';
import ColorTheme from '$libs/types/Theme.ts';

type Props = {
  label: string;
  theme?: ColorTheme;
  disabled?: boolean;
  onClick?: () => Promise<void>;
  minSize?: number;
};

function OptionButton({
  label,
  theme = 'teal',
  disabled = false,
  minSize = 60,
  onClick,
}: Props) {
  const allThemes = {
    gray: 'flex gap-2.5 justify-center items-center px-5 py-4 w-full rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 focus:ring-gray-500',
    teal: 'flex gap-2.5 justify-center items-center px-5 py-4 w-full rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-teal-700 hover:bg-teal-800 focus:bg-teal-800 focus:ring-teal-500',
    indigo:
      'flex gap-2.5 justify-center items-center px-5 py-4 w-full rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-700 hover:bg-indigo-800 focus:bg-indigo-800 focus:ring-indigo-500',
  };

  const handleClick = async () => {
    if (!disabled && onClick) {
      await onClick();
    }
  };

  return (
    <button
      className={allThemes[theme]}
      type="button"
      aria-label={`${label} button`}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={handleClick}
    >
      <span
        className={`flex flex-1 shrink gap-2 justify-center items-center self-stretch  basis-0 min-w-${minSize}`}
      >
        <span className="self-stretch my-auto text-white font-bold">
          {label}
        </span>
      </span>
    </button>
  );
}

export default OptionButton;
