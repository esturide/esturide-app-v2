'use client';
import * as React from 'react';

type Props = {
  label: string;
  theme?: 'teal' | 'indigo';
  disabled?: boolean;
  onClick?: () => Promise<void>;
  minSize?: number;
};

function BigButton({
  label,
  theme = 'teal',
  disabled = false,
  minSize = 60,
  onClick,
}: Props) {
  const getThemeClasses = () => {
    if (disabled) {
      return 'bg-gray-400 cursor-not-allowed';
    }

    switch (theme) {
      case 'indigo':
        return 'bg-indigo-700 hover:bg-indigo-800 focus:bg-indigo-800 focus:ring-indigo-500';
      case 'teal':
      default:
        return 'bg-teal-700 hover:bg-teal-800 focus:bg-teal-800 focus:ring-teal-500';
    }
  };

  const handleClick = async () => {
    if (!disabled && onClick) {
      await onClick();
    }
  };

  return (
    <div className="flex overflow-hidden flex-col justify-center rounded-lg">
      <button
        className={`flex gap-2.5 justify-center items-center px-5 py-4 w-full rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getThemeClasses()}`}
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
    </div>
  );
}

export default BigButton;
