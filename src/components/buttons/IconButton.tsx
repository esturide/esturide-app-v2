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

  const getColorClasses = (theme: ColorTheme) => {
    if (theme == 'indigo') {
      return {
        bg: 'bg-indigo-900',
        hover: 'hover:bg-indigo-800',
        active: 'active:bg-indigo-950',
        focus: 'focus:ring-indigo-500',
      };
    } else if (theme == 'teal') {
      return {
        bg: 'bg-teal-900',
        hover: 'hover:bg-teal-800',
        active: 'active:bg-teal-950',
        focus: 'focus:ring-teal-500',
      };
    } else if (theme == 'gray') {
      return {
        bg: 'bg-gray-900',
        hover: 'hover:bg-gray-800',
        active: 'active:bg-gray-950',
        focus: 'focus:ring-gray-500',
      };
    }

    throw new TypeError('Key not found');
  };

  const colorClasses = getColorClasses(theme);

  return (
    <button
      className={`flex items-center justify-center gap-2.5 h-10 w-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        colorClasses.bg
      } ${colorClasses.focus} ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : `${colorClasses.hover} ${colorClasses.active} cursor-pointer`
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
  );
}

export default IconButton;
