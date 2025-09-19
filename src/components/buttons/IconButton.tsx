import React from 'react';
import { IconType } from 'react-icons';
import ColorTheme from '$libs/types/Theme.ts';

interface IconButtonProps {
  icon: IconType;
  theme?: ColorTheme;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

function IconButton({
  icon: Icon,
  theme = 'teal',
  onClick,
  disabled = false,
  ariaLabel = 'Circular button',
}: IconButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault();
      handleClick();
    }
  };

  const allThemes = {
    gray: 'flex items-center justify-center gap-2.5 h-10 w-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-700 hover:bg-gray-800 active:bg-gray-950 focus:ring-gray-500',
    teal: 'flex items-center justify-center gap-2.5 h-10 w-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-teal-700 hover:bg-teal-800 active:bg-teal-950 focus:ring-teal-500',
    indigo:
      'flex items-center justify-center gap-2.5 h-10 w-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-950 focus:ring-indigo-500',
  };

  return (
    <div>
      <button
        className={`${allThemes[theme]} ${
          disabled ? 'opacity-50 cursor-not-allowed' : `cursor-pointer`
        }`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={ariaLabel}
        type="button"
        role="button"
        tabIndex={0}
      >
        <Icon size={20} color="white" />
      </button>
    </div>
  );
}

export default IconButton;
